"use client";
import { ChangeEvent, FormEvent, useState } from "react";

export default function UploadImage() {
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [caption, setCaption] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    if (fileList) {
      for (const file of Array.from(fileList)) {
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
          console.log("Uploaded successfully!");
        } else {
          console.error("Upload failed.");
        }
      }
    }
  };

  const filesSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;

    if (fileList) setFileList(fileList);
  };

  return (
    <>
      <form
        onSubmit={submit}
        style={{ width: 650 }}
        className="flex flex-col space-y-5 px-5 py-14"
      >
        <input
          onChange={filesSelected}
          type="file"
          accept="image/*"
          multiple
        ></input>
        <input
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          type="text"
          placeholder="Caption"
        ></input>
        <button type="submit">Submit</button>
      </form>

      <ul>
        {fileList &&
          Array.from(fileList).map((file, i) => (
            <li key={i}>
              {file.name} - {file.type} - {file.size / 1000000}
            </li>
          ))}
      </ul>
    </>
  );
}
