-- Add 'superadmin' to the role enum on users
ALTER TABLE `users` MODIFY COLUMN `role` ENUM('superadmin', 'admin', 'employee') NOT NULL DEFAULT 'employee';
