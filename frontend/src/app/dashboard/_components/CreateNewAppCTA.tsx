import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const CreateNewAppCTA = () => {
  return (
    <div className="flex w-full justify-between">
      <p className="text-xl">Your Apps</p>
      <Link
        className={buttonVariants({ variant: "default" })}
        href={"/dashboard/new"}
      >
        Create New App
      </Link>
    </div>
  );
};

export default CreateNewAppCTA;
