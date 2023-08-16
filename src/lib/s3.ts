import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { Condition } from "@aws-cdk/aws-iam";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { BUCKET_NAME, AWS_REGION } from "./constants";
import sharp from "sharp";

const s3Client = new S3Client({ region: AWS_REGION });

export const s3 = {
  async getPresignedUrl(imageId: string): Promise<string> {
    const input = {
      Bucket: BUCKET_NAME,
      Key: imageId,
    };

    const command = new GetObjectCommand(input);
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  },

  async getImageObject(imageId: string) {
    const input = {
      Bucket: BUCKET_NAME,
      Key: imageId,
    };

    const command = new GetObjectCommand(input);
    const response = await s3Client.send(command);

    const contentType = response.ContentType;
    // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.

    const arrayByte = await response.Body?.transformToByteArray();

    if (arrayByte) {
      const blob = new Blob([new Uint8Array(arrayByte)], { type: contentType });

      return URL.createObjectURL(blob);
    }
  },

  async getImageObjectQualityReduced(imageId: string) {
    const input = {
      Bucket: BUCKET_NAME,
      Key: imageId,
    };

    const command = new GetObjectCommand(input);
    const response = await s3Client.send(command);

    const contentType = response.ContentType;
    // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.

    const arrayByte = await response.Body?.transformToByteArray();

    if (arrayByte) {
      const reducedImg = await sharp(arrayByte).toFormat("png").toBuffer();
      const blob = new Blob([reducedImg], { type: "png" });
      return URL.createObjectURL(blob);
    }
  },
  async getPresignedUrlUploadObject(
    key: string,
    userId: string,
    filetype: string
  ) {
    const Fields = {
      "Content-Type": filetype,
    };
    const Conditions = [
      { bucket: BUCKET_NAME },
      ["starts-with", "$key", userId],
      ["starts-with", "$Content-Type", filetype],
    ] as Condition;

    const { url, fields } = await createPresignedPost(s3Client, {
      Bucket: BUCKET_NAME,
      Key: key,
      Conditions,
      Fields,
      Expires: 60, //Seconds before the presigned post expires. 3600 by default.
    });

    return { url, fields };
  },
  async deleteImageId() {},
  async deleteImages() {},
};
