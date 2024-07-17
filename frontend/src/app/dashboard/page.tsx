import React from "react";
import CreateNewAppCTA from "./_components/CreateNewAppCTA";
import { GetBucketsbyUserID } from "@/actions/Buckets";

const page = async () => {
  const buckets = await GetBucketsbyUserID(1);
  console.log(buckets);
  return (
    <div className="px-24 w-full h-full">
      <CreateNewAppCTA />
    </div>
  );
};

export default page;
