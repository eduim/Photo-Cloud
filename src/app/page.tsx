import ImageGallery from "@/components/imageGallery";
import { s3 } from "@/lib/s3";

export default async function Home() {
  // const imagesWithUrl = [];
  // for (const key of keys) {
  //   const url = (await s3.getImageObject(key)) as string;
  //   imagesWithUrl.push({ url, key });
  // }

  const imagesIds = (await s3.getImagesIds()) as string[];
  const imagesWithUrl = await Promise.all(
    imagesIds.map(async (imageId) => {
      return {
        url: (await s3.getImageObject(imageId)) as string,
        imageId,
      };
    })
  );

  return (
    <main className="flex min-h-screen flex-col p-24">
      <ImageGallery imagesWithUrl={imagesWithUrl} />
    </main>
  );
}
