import ImageGallery from "@/components/imageGallery";
import { s3 } from "@/lib/s3";

export default async function Home() {
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
    <main className="flex min-h-screen flex-col pt-5">
      <ImageGallery imagesWithUrl={imagesWithUrl} />
    </main>
  );
}
