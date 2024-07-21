"use client";

import { CreateApiKey } from "@/actions/Api-key";
import { Button } from "@/components/ui/button";
import { ApikeyType } from "@/types";
import React from "react";

const CreateNewKey = () => {
  const handleClick = async () => {
    await CreateApiKey(); // TODO fix this idk why not work
  };
  return <Button onClick={() => handleClick()}>Create New</Button>;
};

export default CreateNewKey;
