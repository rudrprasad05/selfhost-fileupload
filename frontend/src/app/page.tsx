"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Button onClick={() => signOut()}>singou</Button>
    </>
  );
}
