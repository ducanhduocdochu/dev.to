/*
  Warnings:

  - You are about to drop the column `type` on the `reaction` table. All the data in the column will be lost.
  - Added the required column `reactTypeId` to the `Reaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reaction` DROP COLUMN `type`,
    ADD COLUMN `reactTypeId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `ReactionType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ReactionType_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reaction` ADD CONSTRAINT `Reaction_reactTypeId_fkey` FOREIGN KEY (`reactTypeId`) REFERENCES `ReactionType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
