-- CreateTable
CREATE TABLE `short_urls` (
    `id` VARCHAR(191) NOT NULL,
    `original` VARCHAR(191) NOT NULL,
    `shortCode` VARCHAR(191) NOT NULL,
    `clicks` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `short_urls_shortCode_key`(`shortCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
