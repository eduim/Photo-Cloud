import UploadImage from "@/components/uploadImage";

import Image from "next/image";
import ImageGallery from "@/components/imageGallery";
import getImage from "@/lib/getImage";
export default async function Home() {
  const key = "1/0.IMG_20220215_113007.jpg";

  const url = await getImage(key);

  return (
    <main className="flex min-h-screen flex-col  p-24">
      <UploadImage />
      {/* <Image
        src={url}
        alt=""
        width={100}
        height={100}
        quality={75}
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      /> */}
      <div className="grid-cols-3">
        <ImageGallery imageId={key}>
          <div className="min-30 relative">
            <Image
              src={url}
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              loading="lazy"
            />
          </div>
        </ImageGallery>
      </div>
    </main>
  );
}
