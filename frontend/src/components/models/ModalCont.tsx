import React from "react";
import SetLinkImage from "./bucket/SetLinkImage";
import { NewBucketModal } from "./bucket/NewBucketModal";
import DeleteLink from "./bucket/UploadImage";
import { BucketType } from "@/types";
import UploadImage from "./bucket/UploadImage";
import DeleteBucket from "./bucket/DeleteBucket";

const ModalCont = ({
  bucket,
  bucketId,
  option,
}: {
  bucket?: BucketType;
  bucketId?: string;
  option: "image" | "newBucket" | "uploadImage" | "deleteBucket";
}) => {
  if (!bucket) {
    if (option == "newBucket") return <NewBucketModal />;
    else if (option == "deleteBucket")
      return <DeleteBucket bucket={bucketId as string} />;
  }
  if (bucket) {
    if (option == "image") return <SetLinkImage bucket={bucket} />;
    else if (option == "uploadImage") return <UploadImage bucket={bucket} />;
  }
};

export default ModalCont;
