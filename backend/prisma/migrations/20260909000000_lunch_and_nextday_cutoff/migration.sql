ALTER TABLE `employees`
  ADD COLUMN `lunch_start` VARCHAR(191) NULL,
  ADD COLUMN `lunch_end` VARCHAR(191) NULL,
  ADD COLUMN `next_day_cutoff_enabled` BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN `next_day_cutoff_time` VARCHAR(191) NOT NULL DEFAULT '23:00';
