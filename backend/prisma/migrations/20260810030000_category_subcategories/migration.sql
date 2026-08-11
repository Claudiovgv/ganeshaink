-- Subcategorias (1 nível): uma categoria pode ter um "pai", que também é
-- uma categoria. Serviços continuam a apontar sempre a uma categoria —
-- só que agora essa categoria pode ser uma subcategoria em vez de uma
-- categoria de topo.
ALTER TABLE `categories` ADD COLUMN `parent_id` INT NULL;
ALTER TABLE `categories` ADD CONSTRAINT `categories_parent_id_fkey`
  FOREIGN KEY (`parent_id`) REFERENCES `categories`(`id`);

-- As 4 subcategorias pedidas para Barbearia.
INSERT INTO `categories` (`name`, `slug`, `parent_id`, `sort_order`)
SELECT 'Barba', 'barba', id, 0 FROM `categories` WHERE `slug` = 'barbershop';
INSERT INTO `categories` (`name`, `slug`, `parent_id`, `sort_order`)
SELECT 'Cabelo', 'cabelo', id, 1 FROM `categories` WHERE `slug` = 'barbershop';
INSERT INTO `categories` (`name`, `slug`, `parent_id`, `sort_order`)
SELECT 'Barba + Cabelo', 'barba-cabelo', id, 2 FROM `categories` WHERE `slug` = 'barbershop';
INSERT INTO `categories` (`name`, `slug`, `parent_id`, `sort_order`)
SELECT 'Pack Premium', 'pack-premium', id, 3 FROM `categories` WHERE `slug` = 'barbershop';
