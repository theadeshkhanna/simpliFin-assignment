-- CreateTable
CREATE TABLE `vehicles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `companyName` VARCHAR(191) NOT NULL,
    `modelName` VARCHAR(191) NOT NULL,
    `registrationNumber` VARCHAR(191) NOT NULL,
    `vehicleType` ENUM('BIKE', 'AUTO', 'CAR') NOT NULL,
    `driverId` INTEGER NOT NULL,

    UNIQUE INDEX `vehicles_driverId_key`(`driverId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `vehicles` ADD CONSTRAINT `vehicles_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
