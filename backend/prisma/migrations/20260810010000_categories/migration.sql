-- Categorias passam de valor fixo (enum) a registo próprio, gerível no backoffice.
-- Os slugs mantêm-se iguais aos valores do enum antigo para não quebrar
-- URLs existentes (ex.: /servicos?categoria=barbershop).

CREATE TABLE `categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(191) NOT NULL,
  `slug` VARCHAR(191) NOT NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  `is_active` BOOLEAN NOT NULL DEFAULT true,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `categories_slug_key` (`slug`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO `categories` (`name`, `slug`, `sort_order`) VALUES
  ('Barbearia', 'barbershop', 0),
  ('Tatuagem',  'tattoo',     1),
  ('Piercing',  'piercing',   2),
  ('Unhas',     'nails',      3);

ALTER TABLE `services` ADD COLUMN `category_id` INT NULL;

UPDATE `services` s JOIN `categories` c ON c.slug = s.category
  SET s.category_id = c.id;
