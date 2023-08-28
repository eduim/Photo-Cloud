import { UploadImageProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
export default function UploadImage({
  fileListUpload,
  handleSelectImageUpload,
  handleUploadImages,
  uploadState,
}: UploadImageProps) {
  return (
    <>
      <form
        onSubmit={handleUploadImages}
        className="flex m-0 justify-between gap-1 my-2 "
      >
        <Input
          onChange={handleSelectImageUpload}
          type="file"
          accept="image/*"
          multiple
        ></Input>

        <Button type="submit">
          Upload {uploadState.loading && <span>Uploading...</span>}
        </Button>
      </form>

      <ul className="mb-4">
        {fileListUpload &&
          Array.from(fileListUpload).map((file, i) => (
            <li key={i}>
              <Card className="flex justify-center text-center my-1">
                <CardContent className="py-1">{file.name}</CardContent>
              </Card>
            </li>
          ))}
      </ul>
    </>
  );
}
