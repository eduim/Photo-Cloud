"use client";
import { UploadImageProps } from "@/types";
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
        style={{ width: 650 }}
        className="flex flex-col space-y-5 px-5 py-14"
      >
        <input
          onChange={handleSelectImageUpload}
          type="file"
          accept="image/*"
          multiple
        ></input>

        <button type="submit">
          Upload {uploadState.loading && <span>Uploading...</span>}
        </button>
      </form>

      <ul>
        {fileListUpload &&
          Array.from(fileListUpload).map((file, i) => (
            <li key={i}>
              {file.name} - {file.type} - {file.size / 1000000}
            </li>
          ))}
      </ul>
    </>
  );
}
