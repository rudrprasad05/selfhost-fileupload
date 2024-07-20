"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prismadb";
import getSession from "./getSession";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import axios from "axios";

export async function GetBucketsbyUserID(id: number) {
  const res = await axios.get(`http://localhost:3000/api/buckets`, {
    params: {
      userId: id,
    },
  });

  return res;
}

export async function GetBucketsbyID(id: number) {
  const res = await prisma.bucket.findUnique({
    where: {
      id,
    },
  });
  return res;
}

export async function ValidateBucketOwnership(id: number, bucketId: number) {
  try {
    const res = await axios.post(`http://localhost:3000/api/buckets/auth`, {
      params: {
        userId: id,
        bucketId: bucketId,
      },
    });
    return res;
  } catch (error) {
    return null;
  }
}

export async function GetImagesForOneBucket(bucketId: number) {
  console.log("first");
  try {
    const res = await axios.get(`http://localhost:3000/api/buckets/images`, {
      params: {
        bucketId: bucketId,
      },
    });
    return res;
  } catch (error) {
    return null;
  }
}

export async function DeleteBucketFromDB(bucketId: number) {
  try {
    const res = await axios.delete(`http://localhost:3000/api/buckets`, {
      headers: {
        bucketId: bucketId,
      },
    });
    return res;
  } catch (error) {
    return null;
  }
}
