import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const getImage = async (key: string): Promise<string> => {
  const s3 = new S3Client({ region: process.env.AWS_REGION });
  const input = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
  };

  const command = new GetObjectCommand(input);

  return await getSignedUrl(s3, command, { expiresIn: 3600 });
};

export const getImages = async (key: string): Promise<string> => {
  const s3 = new S3Client({ region: process.env.AWS_REGION });
  const input = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
  };

  const command = new GetObjectCommand(input);

  return await getSignedUrl(s3, command, { expiresIn: 3600 });
};

export default getImage;
