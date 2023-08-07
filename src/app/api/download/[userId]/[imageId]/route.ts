import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { headers } from "next/dist/client/components/headers";

type GetParams = {
  params: {
    userId: string;
    imageId: string;
  };
};

// export an async GET function. This is a convention in NextJS
export async function GET(req: Request, { params }: GetParams) {
  // filename for the file that the user is trying to download
  const key = `${params.userId}/${params.imageId}`;
  console.log(key);
  const s3 = new S3Client({ region: process.env.AWS_REGION });

  const input = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
  };

  const command = new GetObjectCommand(input);

  const url = await getSignedUrl(s3, command, {
    expiresIn: 3600,
  });

  return new Response(JSON.stringify(url));
}
