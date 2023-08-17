"use client";
import { useState, FC } from "react";
import DownloadImage from "./downloadImage";
import DeleteImage from "./deleteImage";
import UploadImage from "./uploadImage";
import ImageComponent from "./image";

interface ImageGalleryProps {
  imagesWithUrl: imagesWithUrl[];
}

interface imagesWithUrl {
  url: string;
  imageId: string;
}

const ImageGallery = ({ imagesWithUrl }: ImageGalleryProps) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleSelect = (key: string) => {
    if (selectedImages.includes(key)) {
      setSelectedImages((prevSelectedImages) =>
        prevSelectedImages.filter((element) => element !== key)
      );
    } else {
      setSelectedImages((prevSelectedImages) => [...prevSelectedImages, key]);
    }
  };

  return (
    <>
      <DownloadImage
        imagesWithUrl={imagesWithUrl}
        selectedImages={selectedImages}
      />
      <DeleteImage selectedImages={selectedImages} />
      <UploadImage />
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {imagesWithUrl?.map(({ url, imageId }) => {
            return (
              <ImageComponent
                key={imageId}
                url={url}
                imageId={imageId}
                selectedImages={selectedImages}
                handleSelectImage={handleSelect}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ImageGallery;
