import React from "react";
import SetLinkImage from "./bucket/SetLinkImage";
import { NewBucketModal } from "./bucket/NewBucketModal";
import DeleteLink from "./bucket/UploadImage";
import { BucketType } from "@/types";
import UploadImage from "./bucket/UploadImage";

const ModalCont = ({
  bucket,
  bucketId,
  option,
}: {
  bucket?: BucketType;
  bucketId?: string;
  option: "image" | "newBucket" | "uploadImage";
}) => {
  if (!bucket) {
    if (option == "newBucket") return <NewBucketModal />;
    else if (option == "uploadImage")
      return <UploadImage bucket={bucketId as string} />;
  }
  if (bucket) if (option == "image") return <SetLinkImage bucket={bucket} />;
};

export default ModalCont;
