"use client";

import { NewBucketModal } from "@/components/models/bucket/NewBucketModal";
import ModalCont from "@/components/models/ModalCont";
import { Button, buttonVariants } from "@/components/ui/button";
import { BucketType } from "@/types";
import Link from "next/link";
import React from "react";

const CreateNewAppCTA = () => {
  return (
    <div className="flex w-full justify-between">
      <p className="text-xl">Your Apps</p>
      <ModalCont option="newBucket" />
    </div>
  );
};

export default CreateNewAppCTA;
