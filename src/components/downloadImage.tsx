import { useState } from "react";

interface DownloadImageProps {
  imagesWithUrl: ImagesWithUrl[];
  selectedImages: string[];
}

interface ImagesWithUrl {
  url: string;
  imageId: string;
}

const DownloadImage = ({
  imagesWithUrl,
  selectedImages,
}: DownloadImageProps) => {
  const [download, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
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
    setDownloading(false);
  };

  return (
    <button className="border border-black " onClick={() => handleDownload()}>
      download files {download && <span>downloading...</span>}
    </button>
  );
};

export default DownloadImage;
