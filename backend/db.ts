import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function UploadImageMetaToSQL(
  url: string,
  bucketId: number,
  filename: string
) {
  const newImage = await prisma.images.create({
    data: {
      url,
      bucketId,
      filename,
    },
  });
}

export async function GetBucketsByUserID(userId: number) {
  const newImage = await prisma.bucket.findMany({
    where: {
      userId,
    },
  });

  if (!newImage || newImage.length == 0) {
    return new Error("no data found");
  }

  return newImage;
}

export async function NewBucket(userId: number, name: string) {
  const newImage = await prisma.bucket.create({
    data: {
      userId: userId,
      name: name,
    },
  });

  if (!newImage) {
    return new Error("no data found");
  }

  return newImage;
}

export async function CheckBucketAuth(userId: number, bucketId: number) {
  const newImage = await prisma.bucket.findUnique({
    where: {
      id: bucketId,
    },
    include: {
      Images: true,
    },
  });

  console.log(newImage);

  if (newImage.userId != userId) {
    return null;
  }
  console.log("fire3");

  return newImage;
}
