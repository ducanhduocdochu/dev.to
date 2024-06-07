/*
  Warnings:

  - You are about to drop the `explodingreaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `firereaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `heartreaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `raisehandreaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `unicornreaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `explodingreaction` DROP FOREIGN KEY `ExplodingReaction_postId_fkey`;

-- DropForeignKey
ALTER TABLE `firereaction` DROP FOREIGN KEY `FireReaction_postId_fkey`;

-- DropForeignKey
ALTER TABLE `heartreaction` DROP FOREIGN KEY `HeartReaction_postId_fkey`;

-- DropForeignKey
ALTER TABLE `raisehandreaction` DROP FOREIGN KEY `RaisehandReaction_postId_fkey`;

-- DropForeignKey
ALTER TABLE `unicornreaction` DROP FOREIGN KEY `UnicornReaction_postId_fkey`;

-- DropTable
DROP TABLE `explodingreaction`;

-- DropTable
DROP TABLE `firereaction`;

-- DropTable
DROP TABLE `heartreaction`;

-- DropTable
DROP TABLE `raisehandreaction`;

-- DropTable
DROP TABLE `unicornreaction`;

-- CreateTable
CREATE TABLE `Reaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `postId` INTEGER NOT NULL,
    `type` ENUM('Heart', 'Unicorn', 'Exploding', 'RaiseHand', 'Fire', 'NONE') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reaction` ADD CONSTRAINT `Reaction_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
