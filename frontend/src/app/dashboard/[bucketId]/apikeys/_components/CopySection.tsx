"use client";

import { Button } from "@/components/ui/button";
import { ApikeyType } from "@/types";
import React from "react";

const CopySection = ({ data }: { data: ApikeyType }) => {
  let copy = `R3_APP_ID=${data.accessKeyId}\nR3_SECRET_KEY=${data.secretAccessKey}`;
  return (
    <Button
      onClick={() => {
        navigator.clipboard.writeText(copy);
      }}
      variant={"outline"}
    >
      Copy
    </Button>
  );
};

export default CopySection;
