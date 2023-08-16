import dotenv from "dotenv";
dotenv.config();

if (!process.env.BUCKET_NAME) {
  throw new Error("Missing BUCKET_NAME variable in .env");
}

export const BUCKET_NAME = process.env.BUCKET_NAME;

if (!process.env.AWS_REGION) {
  throw new Error("Missing AWS_REGION variable in .env");
}

export const AWS_REGION = process.env.AWS_REGION;
