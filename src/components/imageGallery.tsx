"use client";
import DownloadImage from "./downloadImage";
import DeleteImage from "./deleteImage";
import UploadImage from "./uploadImage";
import ImageComponent from "./imageComponent";
import useGallery from "@/app/hooks/useGallery";
import { ImageGalleryProps } from "@/types";

const ImageGallery = ({ imagesWithUrl }: ImageGalleryProps) => {
  const {
    images,
    selectedImages,
    actionsState,
    fileListUpload,
    handleSelectImage,
    handleDeleteImages,
    handleUploadImages,
    handleSelectImageUpload,
  } = useGallery(imagesWithUrl);

  return (
    <>
      <DownloadImage imagesWithUrl={images} selectedImages={selectedImages} />
      <DeleteImage
        handleDeleteImages={handleDeleteImages}
        deleteState={actionsState.delete}
      />
      <UploadImage
        fileListUpload={fileListUpload}
        handleSelectImageUpload={handleSelectImageUpload}
        handleUploadImages={handleUploadImages}
        uploadState={actionsState.upload}
      />
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {images?.map(({ url, imageId }) => {
            return (
              <ImageComponent
                key={imageId}
                url={url}
                imageId={imageId}
                selectedImages={selectedImages}
                handleSelectImage={handleSelectImage}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ImageGallery;
