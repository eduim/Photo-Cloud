import UploadImage from "@/components/uploadImage";

import ImageGallery from "@/components/imageGallery";
import getImage from "@/lib/getImage";
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
  ];

  const imagesWithUrl = await Promise.all(
    keys.map(async (key) => {
      return { url: await getImage(key), key };
    })
  );

  return (
    <main className="flex min-h-screen flex-col p-24">
      <UploadImage />
      <ImageGallery imagesWithUrl={imagesWithUrl} />
    </main>
  );
}
