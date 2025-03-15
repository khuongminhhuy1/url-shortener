/*
  Warnings:

  - Added the required column `userId` to the `short_urls` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `short_urls` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `short_urls` ADD CONSTRAINT `short_urls_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
