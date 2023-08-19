import { FormEvent, useState, ChangeEvent } from "react";
import { ImagesWithUrl, ImageGalleryActionsStates } from "@/types";

const useGallery = (imagesWithUrl: ImagesWithUrl[]) => {
  const [images, setImages] = useState(imagesWithUrl);
  const [fileListUpload, setFileListUpload] = useState<FileList | null>(null);
  const [actionsState, setActionsState] = useState<ImageGalleryActionsStates>({
    delete: {
      error: false,
      loading: false,
    },
    upload: {
      delete: false,
      loading: false,
    },
  });

  const [selectedImages, setSelectedImages] = useState<string[]>([]);
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

  return {
    images,
    selectedImages,
    actionsState,
    fileListUpload,
    handleSelectImage,
    handleDeleteImages,
    handleUploadImages,
    handleSelectImageUpload,
  };
};

export default useGallery;
