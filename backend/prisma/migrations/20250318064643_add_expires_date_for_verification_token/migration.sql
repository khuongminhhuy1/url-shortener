/*
  Warnings:

  - Added the required column `expiresAt` to the `verification_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `verification_tokens` ADD COLUMN `expiresAt` DATETIME(3) NOT NULL;
