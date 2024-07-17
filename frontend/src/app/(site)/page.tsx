"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Landing from "./_components/Landing";

export default function Home() {
  return (
    <main className="h-full w-full">
      <Landing />
    </main>
  );
}
