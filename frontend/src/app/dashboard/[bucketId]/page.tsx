import React from "react";
import { GetBucketsbyUserID, ValidateBucketOwnership } from "@/actions/Buckets";
import { BucketType } from "@/types";
import getSession from "@/actions/getSession";

type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const page = async (props: PageProps) => {
  const session = await getSession();
  const userId = parseInt(session?.user.id as string);
  const bucketId = parseInt(props.params.bucketId as string);
  const auth = await ValidateBucketOwnership(userId, bucketId);

  return <div className="px-24 w-full h-full"></div>;
};

export default page;
