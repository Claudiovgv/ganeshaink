-- Ordem em que os artistas/funcionários aparecem em /artistas no site.
ALTER TABLE `employees` ADD COLUMN `sort_order` INT NOT NULL DEFAULT 0;
