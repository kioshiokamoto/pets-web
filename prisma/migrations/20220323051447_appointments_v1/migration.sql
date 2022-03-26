/*
  Warnings:

  - You are about to drop the column `breed` on the `pet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `pet` DROP COLUMN `breed`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `role` ENUM('ADMIN', 'CLIENT', 'VETERINARY') NOT NULL DEFAULT 'CLIENT';

-- CreateTable
CREATE TABLE `BredByPet` (
    `petId` INTEGER NOT NULL,
    `breedId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`petId`, `breedId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Breed` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Breed_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AppointmentByPet` (
    `petId` INTEGER NOT NULL,
    `appointmentId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `breedId` INTEGER NULL,

    PRIMARY KEY (`petId`, `appointmentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Appointment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,
    `symptoms` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `bloodTest` VARCHAR(191) NULL,
    `bill` DOUBLE NULL,
    `medicine` VARCHAR(191) NULL,
    `status` ENUM('BOOKED', 'ATTENDED', 'CANCELLED') NOT NULL DEFAULT 'BOOKED',
    `paymentStatus` ENUM('PENDING', 'PAID') NOT NULL DEFAULT 'PENDING',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BredByPet` ADD CONSTRAINT `BredByPet_petId_fkey` FOREIGN KEY (`petId`) REFERENCES `Pet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BredByPet` ADD CONSTRAINT `BredByPet_breedId_fkey` FOREIGN KEY (`breedId`) REFERENCES `Breed`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AppointmentByPet` ADD CONSTRAINT `AppointmentByPet_petId_fkey` FOREIGN KEY (`petId`) REFERENCES `Pet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AppointmentByPet` ADD CONSTRAINT `AppointmentByPet_breedId_fkey` FOREIGN KEY (`breedId`) REFERENCES `Breed`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AppointmentByPet` ADD CONSTRAINT `AppointmentByPet_appointmentId_fkey` FOREIGN KEY (`appointmentId`) REFERENCES `Appointment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
