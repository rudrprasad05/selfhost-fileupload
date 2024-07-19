"use client";

import { Cog, Coins, Folder, Home, Key } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidenav = ({ bucketId }: { bucketId: number }) => {
  const path = usePathname();
  let currentpath = path.split("/")[path.split("/").length - 1];

  return (
    <div>
      <ul className="flex flex-col gap-4">
        <Link
          href={`/dashboard/${bucketId}`}
          className={`data-[active="true"]:bg-primary hover:bg-slate-800 transition rounded-lg flex gap-2 text-white/60 px-4 py-3 bg-background`}
        >
          <Home />
          Overview
        </Link>
        <Link
          href={`/dashboard/${bucketId}/files`}
          className={`data-[active="true"]:bg-primary hover:bg-slate-800 transition rounded-lg flex gap-2 text-white/60 px-4 py-3 bg-background`}
        >
          <Folder />
          Files
        </Link>
        <Link
          href={`/dashboard/${bucketId}/apikeys`}
          className={`data-[active="true"]:bg-primary hover:bg-slate-800 transition rounded-lg flex gap-2 text-white/60 px-4 py-3 bg-background`}
        >
          <Key />
          API Keys
        </Link>
        <Link
          href={`/dashboard/${bucketId}/plans`}
          className={`data-[active="true"]:bg-primary hover:bg-slate-800 transition rounded-lg flex gap-2 text-white/60 px-4 py-3 bg-background`}
        >
          <Coins />
          Plans & Billing
        </Link>
        <Link
          href={`/dashboard/${bucketId}/settings`}
          className={`data-[active="true"]:bg-primary hover:bg-slate-800 transition rounded-lg flex gap-2 text-white/60 px-4 py-3 bg-background`}
        >
          <Cog />
          Settings
        </Link>
      </ul>
    </div>
  );
};

export default Sidenav;
