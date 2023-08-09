"use client";
import { useState, FC } from "react";
import Image from "next/image";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  imagesWithUrl: imagesWithUrl[];
}

interface imagesWithUrl {
  url: string;
  key: string;
}

const ImageGallery: FC<Props> = ({ imagesWithUrl }) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [download, setDownloading] = useState(false);

  const handleSelect = (key: string) => {
    if (selectedImages.includes(key)) {
      setSelectedImages((prevSelectedImages) =>
        prevSelectedImages.filter((element) => element !== key)
      );
    } else {
      setSelectedImages((prevSelectedImages) => [...prevSelectedImages, key]);
    }
  };
  const handleSubmit = async () => {
    setDownloading(true);
    for (const imageId of selectedImages) {
      const requestPresignedUrl = await fetch(`/api/download/${imageId}`);
      const presignedUrl = await requestPresignedUrl.json();

      const requestUrl = await fetch(presignedUrl);
      const blob = await requestUrl.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = imageId;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setDownloading(false);
  };

  return (
    <>
      <button onClick={() => handleSubmit()}>
        download files {download && <span>downloading...</span>}
      </button>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {imagesWithUrl?.map(({ url, key }, index) => {
            const priority = index < 3;
            return (
              <div
                key={key}
                className={classNames(
                  selectedImages.includes(key)
                    ? "border-black opacity-80"
                    : "border-2 border-transparent",
                  "border-2 rounded-lg border-solid h-56 w-56 min-h-56 min-w-56 relative aspect-w-1 aspect-h-1  overflow-hidden  bg-gray-200"
                )}
                onClick={() => handleSelect(key)}
              >
                <Image
                  alt=""
                  src={url}
                  fill={true}
                  priority={priority}
                  quality={50}
                  className={classNames(
                    isLoading
                      ? "scale-110 blur-2xl grayscale"
                      : "scale-100 blur-0 grayscale-0",
                    "duration-700 ease-in-out group-hover:opacity-75 object-cover object-center rounded-md"
                  )}
                  sizes="max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onLoadingComplete={() => setIsLoading(false)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ImageGallery;
