import React from "react";
import CreateNewAppCTA from "./_components/CreateNewAppCTA";
import { GetBucketsbyUserID } from "@/actions/Buckets";
import { BucketType } from "@/types";
import DisplayBucket from "./_components/DisplayBucket";

const page = async () => {
  const { data: buckets } = await GetBucketsbyUserID(1);

  if (Object.keys(buckets).length === 0) return null;

  return (
    <div className="px-24 w-full h-full">
      <CreateNewAppCTA />
      <DisplayBucket buckets={buckets} />
    </div>
  );
};

export default page;
