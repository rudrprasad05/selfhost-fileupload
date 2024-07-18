import Svgcont from "@/components/svg/svgcont";
import { Card, CardHeader } from "@/components/ui/card";
import { BucketType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DisplayBucket = ({ buckets }: { buckets: BucketType[] }) => {
  return (
    <div className="grid grid-cols-3 gap-10 my-6">
      {buckets.map((b, i) => (
        <Link key={b.id} href={`dashboard/${b.id}`}>
          <div key={b.id} className="bg-secondary rounded-lg overflow-clip">
            <div className="w-full h-32 bg-white">
              <Image
                src={`/bg/bg${i}.png`}
                alt="background image"
                height={200}
                width={400}
                className="object-cover h-32 w-full"
              />
            </div>
            <div className=" py-4 px-6">
              <h1>{b.name}</h1>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DisplayBucket;
