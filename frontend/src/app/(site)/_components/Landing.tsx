import Folder from "@/components/icons/folder";
import { buttonVariants } from "@/components/ui/button";
import { FolderArchive, FolderClosed } from "lucide-react";
import Link from "next/link";
import React from "react";

const Landing = () => {
  return (
    <div className="grid grid-cols-2 px-24 items-center h-[75vh]">
      <div>
        <h1 className="text-5xl mb-8">
          <span className="text-primary">File Upload</span> made easy
        </h1>
        <p className="text-xl">
          Who wants to configure an s3 bucket when you could get images served
          to you from a shitty server with a low bandwidth internet connection.
        </p>
        <div className="flex gap-4 mt-5">
          <Link
            className={buttonVariants({ variant: "default" })}
            href={"/auth/login"}
          >
            Try it out
          </Link>
          <Link
            className={buttonVariants({ variant: "secondary" })}
            href={"/docs"}
          >
            Docs
          </Link>
        </div>
      </div>
      <div className="w-full">
        <FolderClosed className="w-[50%] h-[50%] stroke-1 my-auto mx-auto" />
      </div>
    </div>
  );
};

export default Landing;
