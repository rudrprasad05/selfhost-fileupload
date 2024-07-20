import { ImageType } from "@/types";
import React from "react";

const Images = ({ images }: { images: ImageType[] }) => {
  console.log(images);
  return (
    <div>
      {images.map((i) => (
        <div>{i.filename}</div>
      ))}
    </div>
  );
};

export default Images;
