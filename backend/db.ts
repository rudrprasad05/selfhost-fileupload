const { PrismaClient } = require("@prisma/client");
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
  console.log(userId);
  const newImage = await prisma.bucket.findMany({
    where: {
      userId,
    },
  });
  console.log("first", newImage);

  if (!newImage || newImage.length == 0) {
    console.log("2");
    return new Error("no data found");
  }

  return newImage;
}
