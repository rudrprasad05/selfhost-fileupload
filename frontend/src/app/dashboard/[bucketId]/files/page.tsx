import React from "react";
import UploadNewImageCTA from "./_components/UploadNewImageCTA";
import { GetImagesForOneBucket } from "@/actions/Buckets";
import Images from "./_components/Images";

const page = async ({ params }: { params: { bucketId: string } }) => {
  const bId = parseInt(params.bucketId);
  const images = await GetImagesForOneBucket(bId);

  return (
    <div>
      <UploadNewImageCTA />
      <Images images={images?.data} />
    </div>
  );
};

export default page;
