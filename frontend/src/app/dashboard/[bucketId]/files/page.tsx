import React from "react";
import UploadNewImageCTA from "./_components/UploadNewImageCTA";
import { GetBucketsbyID, GetImagesForOneBucket } from "@/actions/Buckets";
import Images from "./_components/Images";
import { columns } from "./_components/imagetable/columns";
import { DataTable } from "./_components/imagetable/data-table";

const page = async ({ params }: { params: { bucketId: string } }) => {
  const bId = parseInt(params.bucketId);
  const images = await GetImagesForOneBucket(bId);
  const bucket = await GetBucketsbyID(bId);
  return (
    <div>
      <UploadNewImageCTA bucket={bucket} />
      {/* <Images images={images?.data} /> */}
      <DataTable columns={columns} data={images?.data} />
    </div>
  );
};

export default page;
