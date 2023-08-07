"use client";
import { useState, FC } from "react";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  imageId: string;
  children: React.ReactNode;
}

const ImageGallery: FC<Props> = ({ imageId, children }) => {
  const [selected, setSelected] = useState(false);
  console.log(imageId);
  const handleSelect = (id: string) => {
    setSelected(!selected);
  };
  const handleSubmit = async (imageId: string) => {
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
    // const presignedUrl = await response.json();
    // console.log(presignedUrl);

    // fetch(presignedUrl)
    //   .then((res) => res.blob())
    //   .then((blob) => {
    //     console.log(blob);
    //     const url = window.URL.createObjectURL(blob);
    //     const link = document.createElement("a");
    //     link.href = url;
    //     link.download = imageId;
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    //   });
  };

  return (
    <>
      <button onClick={() => handleSubmit(imageId)}>download files</button>

      <div
        key={imageId}
        className={classNames(
          selected ? "border-red-300 opacity-80" : "border-black",
          "border-2 border-solid"
        )}
        onClick={() => handleSelect(imageId)}
      >
        {children}
      </div>
    </>
  );
};

export default ImageGallery;
