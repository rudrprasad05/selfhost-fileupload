import React from "react";
import UploadNewImageCTA from "./_components/UploadNewImageCTA";
import { GetBucketsbyID, GetImagesForOneBucket } from "@/actions/Buckets";
import { columns } from "./_components/imagetable/columns";
import { DataTable } from "./_components/imagetable/data-table";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { bucketId: string } }) => {
  const bId = parseInt(params.bucketId);
  const images = await GetImagesForOneBucket(bId);
  const bucket = await GetBucketsbyID(bId);

  if (!bucket) return redirect("/dashboard");
  return (
    <div>
      <UploadNewImageCTA bucket={bucket} />
      <DataTable columns={columns} data={images?.data} />
    </div>
  );
};

export default page;
