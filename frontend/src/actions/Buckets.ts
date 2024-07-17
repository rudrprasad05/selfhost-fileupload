"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prismadb";
import getSession from "./getSession";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import axios from "axios";

export async function GetBucketsbyUserID(id: number) {
  console.log(id);
  const res = await axios.get(`http://localhost:3000/api/buckets`, {
    params: {
      userId: id,
    },
  });
  return res;
}
