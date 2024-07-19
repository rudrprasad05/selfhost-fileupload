import React from "react";
import UploadNewImageCTA from "../_components/UploadNewImageCTA";

const page = ({ params }: { params: { bucketId: string } }) => {
  const bId = params.bucketId;
  return (
    <div>
      <UploadNewImageCTA />
    </div>
  );
};

export default page;
