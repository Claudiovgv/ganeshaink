-- Correção de significado: este valor é a % que fica retida para o estúdio,
-- não a % que o barbeiro recebe (o barbeiro fica com o resto da receita
-- líquida). Só o nome da coluna muda — os valores já guardados continuam
-- válidos com o novo significado.
ALTER TABLE `employees` CHANGE `payout_percent` `studio_percent` DECIMAL(5, 2) NULL;
