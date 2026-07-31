ALTER TABLE `users`
  ADD COLUMN `two_factor_secret` VARCHAR(191) NULL,
  ADD COLUMN `two_factor_enabled` BOOLEAN NOT NULL DEFAULT false;
