-- Só correr depois de confirmar, com um SELECT, que nenhum serviço ficou
-- com category_id NULL na migração anterior (20260810010000_categories).

ALTER TABLE `services` MODIFY `category_id` INT NOT NULL;
ALTER TABLE `services` ADD CONSTRAINT `services_category_id_fkey`
  FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`);
ALTER TABLE `services` DROP COLUMN `category`;
