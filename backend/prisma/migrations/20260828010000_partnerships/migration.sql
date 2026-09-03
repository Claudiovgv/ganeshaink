CREATE TABLE `partnerships` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `percent` DECIMAL(5, 2) NOT NULL,
    `extra_field_label` VARCHAR(191) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `sort_order` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `appointments` ADD COLUMN `partnership_id` INTEGER NULL;
ALTER TABLE `appointments` ADD COLUMN `extra_field_value` VARCHAR(191) NULL;

ALTER TABLE `appointments` ADD CONSTRAINT `appointments_partnership_id_fkey` FOREIGN KEY (`partnership_id`) REFERENCES `partnerships`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
