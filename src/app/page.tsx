import UploadImage from "@/components/uploadImage";
import ImageGallery from "@/components/imageGallery";
import { s3 } from "@/lib/s3";

export default async function Home() {
  let keys = [
    "1/0.IMG_20211207_111039.jpg",
    "1/0.IMG_20211220_170150.jpg",
    "1/0.IMG_20220122_121820.jpg",
    "1/0.IMG_20220215_113007.jpg",
    "1/0.IMG_20220323_164818.jpg",
    "1/0.IMG_20220507_092524.jpg",
    "1/0.IMG_20221224_101005.jpg",
    "1/0.IMG_20221224_101036_Bokeh.jpg",
    "1/0.IMG_20220507_092524.jpg",
  ];

  // const imagesWithUrl = [];
  // for (const key of keys) {
  //   const url = (await s3.getImageObject(key)) as string;
  //   imagesWithUrl.push({ url, key });
  // }

  const imagesWithUrl = await Promise.all(
    keys.map(async (key) => {
      return {
        url: (await s3.getImageObject(key)) as string,
        key,
      };
    })
  );
  const url = await s3.getImageObject("1/0.IMG_20221224_101005.jpg");

  return (
    <main className="flex min-h-screen flex-col p-24">
      <UploadImage />

      <ImageGallery imagesWithUrl={imagesWithUrl} />
    </main>
  );
}
