import React from "react";
import SetLinkImage from "./bucket/SetLinkImage";
import { NewBucketModal } from "./bucket/NewBucketModal";
import DeleteLink from "./bucket/DeleteLink";
import { BucketType } from "@/types";

const ModalCont = ({
  bucket,
  option,
}: {
  bucket?: BucketType;
  option: "image" | "newBucket" | "delete";
}) => {
  if (!bucket) {
    if (option == "newBucket") return <NewBucketModal />;
  }
  if (bucket)
    if (option == "image") return <SetLinkImage bucket={bucket} />;
    else if (option == "delete") return <DeleteLink bucket={bucket} />;
};

export default ModalCont;
