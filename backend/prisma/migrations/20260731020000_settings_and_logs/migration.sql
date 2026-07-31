CREATE TABLE `settings` (
  `key` VARCHAR(191) NOT NULL,
  `value` TEXT NULL,
  `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`key`)
) DEFAULT CHARACTER SET utf8mb4;

CREATE TABLE `system_logs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `level` ENUM('info','warning','error','security') NOT NULL DEFAULT 'info',
  `category` VARCHAR(191) NOT NULL,
  `message` TEXT NOT NULL,
  `ip` VARCHAR(191) NULL,
  `user_id` INT NULL,
  `meta` JSON NULL,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  INDEX `system_logs_created_at_idx` (`created_at`),
  INDEX `system_logs_level_idx` (`level`)
) DEFAULT CHARACTER SET utf8mb4;
