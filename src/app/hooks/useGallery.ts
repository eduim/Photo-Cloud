import { FormEvent, useState, ChangeEvent } from "react";
import { ImagesWithUrl, ImageGalleryActionsStates } from "@/types";

const useGallery = (imagesWithUrl: ImagesWithUrl[]) => {
  const [images, setImages] = useState(imagesWithUrl);
  const [fileListUpload, setFileListUpload] = useState<FileList | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [actionsState, setActionsState] = useState<ImageGalleryActionsStates>({
    delete: {
      error: false,
      loading: false,
    },
    upload: {
      error: false,
      loading: false,
    },
    download: {
      error: false,
      loading: false,
    },
  });

  const handleSelectImage = (imageId: string) => {
    if (selectedImages.includes(imageId)) {
      setSelectedImages((prevSelectedImages) =>
        prevSelectedImages.filter((element) => element !== imageId)
      );
    } else {
      setSelectedImages((prevSelectedImages) => [
        ...prevSelectedImages,
        imageId,
      ]);
    }
  };

  const handleSelectImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) setFileListUpload(fileList);
  };

  const handleDeleteImages = async () => {
    if (selectedImages.length === 0) return;
    setActionsState((prevState) => ({
      ...prevState,
      delete: {
        ...prevState.delete,
        loading: true,
      },
    }));

    await fetch("/api/delete", {
      method: "POST",
      body: JSON.stringify(selectedImages),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        setImages((prevImages) =>
          prevImages.filter((image) => !selectedImages.includes(image.imageId))
        );
        setSelectedImages([]);
      })
      .catch((err) => {
        setActionsState((prevState) => ({
          ...prevState,
          delete: {
            ...prevState.delete,
            error: true,
          },
        }));
        console.error(err);
      })
      .finally(() => {
        setActionsState((prevState) => ({
          ...prevState,
          delete: {
            ...prevState.delete,
            loading: false,
          },
        }));
      });

    setSelectedImages([]);
  };

  const handleUploadImages = async (event: FormEvent) => {
    event.preventDefault();

    setFileListUpload(null);
    setActionsState((prevState) => ({
      ...prevState,
      upload: {
        ...prevState.upload,
        loading: true,
      },
    }));

    if (fileListUpload) {
      for (const file of Array.from(fileListUpload)) {
        const filename = encodeURIComponent(file.name);
        const filetype = encodeURIComponent(file.type);

        const res = await fetch(
          `/api/upload?filename=${filename}&filetype=${filetype}`
        );
        const { url, fields } = await res.json();

        const formData = new FormData();

        Object.entries({ ...fields, file }).forEach(([key, value]) => {
          formData.append(key, value as string);
        });

        const options = {
          method: "POST",
          body: formData,
        };

        const upload = await fetch(url, options);

        if (upload.ok) {
          const newImage = await fetch(
            `api/getimage?filename=${filename}&filetype=${filetype}`
          ).then((res) => res.json());
          setImages((prevImages) => [...prevImages, newImage]);
        } else {
          console.error("Upload failed.");
        }
      }

      setActionsState((prevState) => ({
        ...prevState,
        upload: {
          ...prevState.upload,
          loading: false,
        },
      }));
    }
  };

  const handleDownloadImages = async () => {
    setActionsState((prevState) => ({
      ...prevState,
      download: {
        ...prevState.download,
        download: true,
      },
    }));
    for (const imageId of selectedImages) {
      const url = imagesWithUrl.find((image) => image.imageId === imageId)
        ?.url as string;
      const link = document.createElement("a");
      link.href = url;
      link.download = imageId;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    setActionsState((prevState) => ({
      ...prevState,
      download: {
        ...prevState.download,
        download: false,
      },
    }));
    setSelectedImages([]);
  };

  return {
    images,
    selectedImages,
    actionsState,
    fileListUpload,
    handleDownloadImages,
    handleSelectImage,
    handleDeleteImages,
    handleUploadImages,
    handleSelectImageUpload,
  };
};

export default useGallery;
