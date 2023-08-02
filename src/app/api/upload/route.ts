import { randomUUID } from "crypto";

import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";
import { Condition } from "@aws-cdk/aws-iam";

export async function GET(request: Request) {
  const originUrl = new URL(request.url);
  const filename = originUrl.searchParams.get("filename");
  const filetype = originUrl.searchParams.get("filetype");

  if (!filename || !filetype) {
    return new Response("Missing filename or filetype", {
      status: 400,
    });
  }

  const s3 = new S3Client({ region: process.env.AWS_REGION });

  // const userId = randomUUID();
  // const fileId = randomUUID();

  const userId = "1";
  let fileId = 0;

  const key = `${userId}/${fileId}.${filename}`;

  fileId++;

  if (!process.env.BUCKET_NAME) {
    return new Response("Missing BUCKET_NAME", {
      status: 400,
    });
  }
  // const Key = "user/eric/1";
  const Fields = {
    "Content-Type": filetype,
  };

  const Conditions = [
    { bucket: process.env.BUCKET_NAME },
    ["starts-with", "$key", userId],
    ["starts-with", "$Content-Type", filetype],
  ] as Condition;

  const { url, fields } = await createPresignedPost(s3, {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    Conditions,
    Fields,
    Expires: 60, //Seconds before the presigned post expires. 3600 by default.
  });

  return new Response(JSON.stringify({ url, fields }));
}
