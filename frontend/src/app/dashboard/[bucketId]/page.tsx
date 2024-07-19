import React from "react";
import { GetBucketsbyUserID, ValidateBucketOwnership } from "@/actions/Buckets";
import { BucketType } from "@/types";
import getSession from "@/actions/getSession";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const page = async (props: PageProps) => {
  const session = await getSession();
  const userId = parseInt(session?.user.id as string);
  const bucketId = parseInt(props.params.bucketId as string);

  const auth = await ValidateBucketOwnership(userId, bucketId);

  if (!auth) notFound();

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="grow rounded-lg flex flex-col px-5 py-3 border border-secondary/80">
          <h3 className="mb-2 text-lg">Get Started</h3>
          <p className="text-sm text-secondary-foreground/60">
            Check out the link below for our getting started guide
          </p>
          <Link
            className="pt-5 mt-auto text-sm underline"
            href={"/docs/get-started"}
          >
            Get Started
          </Link>
        </div>
        <div className="grow rounded-lg flex flex-col px-5 py-3 border border-secondary/80">
          <h3 className="mb-2 text-lg">Read our docs</h3>
          <p className="text-sm text-secondary-foreground/60">
            Check out the link below to our docs
          </p>
          <Link className="pt-5 mt-auto text-sm underline" href={"/docs"}>
            View Docs
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div className="grow rounded-lg flex flex-col px-5 py-3 border border-secondary/80">
          <h3 className="mb-2 text-lg">Total Files</h3>
          <p className="text-sm text-secondary-foreground/60">All time</p>
          <h3 className="pt-5 mt-auto ">{auth.data.Images.length}</h3>
        </div>
        <div className="grow rounded-lg flex flex-col px-5 py-3 border border-secondary/80">
          <h3 className="mb-2 text-lg">Files Uploaded</h3>
          <p className="text-sm text-secondary-foreground/60">Past Month</p>
          <h3 className="pt-5 mt-auto ">{auth.data.Images.length}</h3>
        </div>
        <div className="grow rounded-lg flex flex-col px-5 py-3 border border-secondary/80">
          <h3 className="mb-2 text-lg">Usage</h3>
          <p className="text-sm text-secondary-foreground/60">total</p>
          <h3 className="pt-5 mt-auto ">{auth.data.Images.length}</h3>
        </div>
        <div className="grow rounded-lg flex flex-col px-5 py-3 border border-secondary/80">
          <h3 className="mb-2 text-lg">Usage</h3>
          <p className="text-sm text-secondary-foreground/60">past month</p>
          <h3 className="pt-5 mt-auto ">{auth.data.Images.length}</h3>
        </div>
      </div>
    </div>
  );
};

export default page;
