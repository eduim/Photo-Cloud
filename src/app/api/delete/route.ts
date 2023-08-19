import { s3 } from "@/lib/s3";
import { NextRequest, NextResponse } from "next/server";

import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const images = await request.json();

  const originUrl = new URL(request.url);

  // const path = originUrl.searchParams.get("path") as string;
  // const userId = "1";
  // let fileId = 0;
  // const key = `${userId}/${fileId}.${filename}`;
  // fileId++;

  s3.deleteImageObjects(images);
  revalidatePath("/");

  return new Response(JSON.stringify("Deleted"), { status: 200 });
}
