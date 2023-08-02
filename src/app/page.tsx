import Upload from "@/components/upload";

import Image from "next/image";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

export default async function Home() {
  const s3 = new S3Client({ region: process.env.AWS_REGION });

  const input = {
    Bucket: process.env.BUCKET_NAME,
    Key: "1/0.IMG_20220215_113007.jpg",
  };
  const command = new GetObjectCommand(input);
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  console.log(url);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Image src={url} alt="" width={300} height={300} />
      <Upload />
    </main>
  );
}
