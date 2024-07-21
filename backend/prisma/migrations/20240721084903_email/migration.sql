/*
  Warnings:

  - The primary key for the `ApiKey` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `ApiKey` table. The data in that column could be lost. The data in that column will be cast from `Binary(16)` to `Int`.

*/
-- AlterTable
ALTER TABLE `ApiKey` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
