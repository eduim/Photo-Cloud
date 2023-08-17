"use client";
import { classNames } from "@/lib/classNames";
import { useState } from "react";
import Image from "next/image";

interface ImageProps {
  url: string;
  imageId: string;
  selectedImages: string[];
  handleSelectImage: (key: string) => void;
}

const ImageComponent = ({
  url,
  imageId,
  selectedImages,
  handleSelectImage,
}: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      key={imageId}
      className={classNames(
        selectedImages.includes(imageId)
          ? "border-black opacity-80"
          : "border-2 border-transparent",
        "border-2 rounded-lg border-solid h-56 w-56 min-h-56 min-w-56 relative aspect-w-1 aspect-h-1  overflow-hidden  bg-gray-200"
      )}
      onClick={() => handleSelectImage(imageId)}
    >
      <Image
        alt=""
        src={url}
        fill={true}
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
};

export default ImageComponent;
