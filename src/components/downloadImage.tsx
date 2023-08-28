import { Button } from "@/components/ui/button";
import { DownloadImageProps } from "@/types";
const DownloadImage = ({
  downloadState,
  handleDownloadImages,
}: DownloadImageProps) => {
  const downloadText = downloadState.loading
    ? "Downloading..."
    : "Download images";

  return <Button onClick={handleDownloadImages}>{downloadText}</Button>;
};

export default DownloadImage;
