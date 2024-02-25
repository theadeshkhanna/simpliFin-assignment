-- CreateTable
CREATE TABLE `rides` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `totalFare` INTEGER NOT NULL,
    `pickup` VARCHAR(191) NOT NULL,
    `destination` VARCHAR(191) NOT NULL,
    `passengerId` INTEGER NOT NULL,
    `driverId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `rides` ADD CONSTRAINT `rides_passengerId_fkey` FOREIGN KEY (`passengerId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rides` ADD CONSTRAINT `rides_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
