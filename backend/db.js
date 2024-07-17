const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function UploadImageMetaToSQL(url, bucketId, filename) {
  const newImage = await prisma.images.create({
    data: {
      url,
      bucketId,
      filename,
    },
  });
}

module.exports = { UploadImageMetaToSQL };
