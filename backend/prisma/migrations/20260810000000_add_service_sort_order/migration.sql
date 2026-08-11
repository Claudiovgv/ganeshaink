-- Ordem de exibição dos serviços:
--   services.sort_order        -> catálogo público /servicos, definida pelo admin
--   employee_services.sort_order -> página do artista, cada funcionário organiza a sua
ALTER TABLE `services` ADD COLUMN `sort_order` INT NOT NULL DEFAULT 0;
ALTER TABLE `employee_services` ADD COLUMN `sort_order` INT NOT NULL DEFAULT 0;
