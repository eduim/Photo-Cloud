"use server";
import getImage from "@/lib/getImage";
export async function downloadImage(key: string) {
  const url = await getImage(key);
  return url;
}
