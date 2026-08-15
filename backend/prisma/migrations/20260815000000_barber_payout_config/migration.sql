-- Configuração por funcionário usada na página Análise > Barbearia: custo de
-- material por marcação concluída, e % que o barbeiro recebe da receita
-- líquida (receita - material). NULL = ainda não configurado para essa pessoa.
ALTER TABLE `employees` ADD COLUMN `material_cost` DECIMAL(6, 2) NULL;
ALTER TABLE `employees` ADD COLUMN `payout_percent` DECIMAL(5, 2) NULL;
