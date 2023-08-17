import sharp from "sharp";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { Condition } from "@aws-cdk/aws-iam";
import {
  S3Client,
  GetObjectCommand,
  DeleteObjectsCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { BUCKET_NAME, AWS_REGION } from "./constants";

const s3Client = new S3Client({ region: AWS_REGION });

const input = { Bucket: BUCKET_NAME, Key: "" };

export const s3 = {
  async getPresignedUrl(imageId: string) {
    input.Key = imageId;
    const command = new GetObjectCommand(input);
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  },

  async getImageObject(imageId: string) {
    input.Key = imageId;
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
    input.Key = imageId;
    const command = new GetObjectCommand(input);
    const response = await s3Client.send(command);

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
  async deleteImageObjects(imagesIds: string[]) {
    const deleteInput = {
      Bucket: BUCKET_NAME,
      Delete: {
        Objects: imagesIds.map((imageId) => ({ Key: imageId })),
      },
    };

    const command = new DeleteObjectsCommand(deleteInput);

    try {
      const { Deleted } = await s3Client.send(command);
      if (Deleted) {
        console.log(
          `Successfully deleted ${Deleted.length} objects from S3 bucket. Deleted objects:`
        );
      }
    } catch (err) {
      console.error(err);
    }
  },

  async getImagesIds() {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      MaxKeys: 100,
    });

    try {
      let isTruncated = true;

      while (isTruncated) {
        const { Contents, IsTruncated, NextContinuationToken } =
          await s3Client.send(command);

        const contentsList = Contents?.map((c) => {
          return c.Key;
        });

        isTruncated = IsTruncated as boolean;
        command.input.ContinuationToken = NextContinuationToken;
        return contentsList;
      }
    } catch (err) {
      console.error(err);
    }
  },
};
