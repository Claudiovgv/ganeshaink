-- Valor específico da marcação, quando diferente do preço de catálogo do
-- serviço (ex.: desconto pontual, ajuste manual). NULL = usa o preço do serviço.
ALTER TABLE `appointments` ADD COLUMN `price` DECIMAL(8, 2) NULL;
