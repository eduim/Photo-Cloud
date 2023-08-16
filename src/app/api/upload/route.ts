import { s3 } from "@/lib/s3";

export async function GET(request: Request) {
  const originUrl = new URL(request.url);
  const filename = originUrl.searchParams.get("filename");
  const filetype = originUrl.searchParams.get("filetype");

  if (!filename || !filetype) {
    return new Response("Missing filename or filetype", {
      status: 400,
    });
  }

  const userId = "1";
  let fileId = 0;
  const key = `${userId}/${fileId}.${filename}`;
  fileId++;

  const { url, fields } = await s3.getPresignedUrlUploadObject(
    key,
    userId,
    filetype
  );
  console.log(url, fields);

  return new Response(JSON.stringify({ url, fields }));
}
