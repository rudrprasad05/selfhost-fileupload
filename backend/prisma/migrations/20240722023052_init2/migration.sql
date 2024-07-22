/*
  Warnings:

  - A unique constraint covering the columns `[bucketId]` on the table `ApiKey` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ApiKey_bucketId_key` ON `ApiKey`(`bucketId`);
