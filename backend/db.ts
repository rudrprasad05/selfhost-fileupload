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
  return newImage;
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
  console.log(newImage);

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

  if (newImage.userId != userId) {
    return null;
  }

  return newImage;
}

export async function GetImagesForBucket(bucketId: number) {
  const newImage = await prisma.images.findMany({
    where: {
      bucketId: bucketId,
    },
  });

  if (!newImage) {
    return null;
  }
  return newImage;
}

export async function DeleteBucket(bucketId: number) {
  const newImage = await prisma.bucket.delete({
    where: {
      id: bucketId,
    },
  });

  const res = await prisma.images.deleteMany({
    where: {
      bucketId,
    },
  });

  if (!newImage) {
    return null;
  }

  return newImage;
}
