import UploadImage from "@/components/uploadImage";

import Image from "next/image";
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
  const key = "1/0.IMG_20220215_113007.jpg";

  const url = await getImage(key);

  const imagesWithUrl = await Promise.all(
    keys.map(async (key) => {
      return { url: await getImage(key), key };
    })
  );

  return (
    <main className="flex min-h-screen flex-col p-24">
      <UploadImage />
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {imagesWithUrl.map(({ url, key }) => {
            return (
              <ImageGallery imageId={key} key={key}>
                <Image
                  alt=""
                  src={url}
                  fill={true}
                  loading="lazy"
                  quality={60}
                  className="object-cover object-center rounded-md"
                  sizes="max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </ImageGallery>
            );
          })}
        </div>
      </div>
    </main>
  );
}
