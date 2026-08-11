# Migração: categorias de serviços fixas → categorias geríveis

## Porquê
Hoje a categoria de um serviço (`barbershop`, `tattoo`, `piercing`, `nails`) é um
valor fixo (`enum`) na base de dados, escrito também no código do backend, do
backoffice e do site. Passar a categoria a ser um registo próprio permite criar,
renomear e ordenar categorias no backoffice, sem tocar em código.

## Conveniência para testar localmente: saltar o 2FA

O login exige sempre 2FA (código de 6 dígitos), incluindo em local — o que
trava rapidamente quem está só a testar. Adicionado um atalho **só para
desenvolvimento**:

```
# backend/.env
DISABLE_2FA_FOR_LOCAL_DEV=true
```

Com isto, o login devolve logo o token, sem pedir código. Duas proteções
para isto nunca escapar para produção por engano:
- Só ativa se a variável estiver **explicitamente** definida como `"true"`
  — nenhum ambiente novo (produção incluída) a tem por omissão.
- Fica sempre desligado durante os testes automáticos (`NODE_ENV=test`),
  mesmo que o `.env` a tenha ativa, para os testes de 2FA continuarem a
  validar o comportamento real.
- `backend/.env` está no `.gitignore` — esta linha nunca é commitada.

**Não copiar esta variável para o `.env` do servidor.**

## Estado

- [x] 1. Desenhar o modelo `Category` e a migração
- [x] 2. Migração SQL: criar tabela, popular com as 4 categorias atuais, ligar aos serviços
      — aplicada e testada **localmente**, em duas partes (ver nota de collation abaixo)
- [x] 3. Backend: rotas de categorias (públicas + admin)
- [x] 4. Backend: `Service.category` passa a `Service.categoryId`
      — 37 testes a passar, testado localmente
- [x] 4b. Backend: `admin/stats.js` e `prisma/seed.js`/`seed-team.js` também
       usavam a categoria antiga diretamente — corrigidos também.
- [x] 5. Backoffice: ecrã "Categorias" (criar/renomear/ordenar/desativar)
      — menu novo, só visível a admin/superadmin
- [x] 6. Backoffice: formulário de serviço, página Serviços, Estatísticas e
      Funcionários usam categorias dinâmicas — build local limpo
- [x] 7. Frontend: `/servicos`, páginas de artista e assistente de marcação
      (Passo 1) usam categorias dinâmicas
- [x] 8. Testado ao vivo: criei a categoria "Pacotes" no backoffice → apareceu
      logo no site público, sem alterar código nenhum
- [ ] 9. Testar tudo localmente (backend + backoffice + frontend) — falta só
      o assistente de marcação (Passo 1 → 5) de ponta a ponta
- [ ] 10. Publicar no servidor (passo a passo, no fim)

## Decisões tomadas

- **Compatibilidade de URLs**: as 4 categorias atuais mantêm o mesmo `slug`
  (`barbershop`, `tattoo`, `piercing`, `nails`) na migração, para que
  `/servicos?categoria=barbershop` continue a funcionar sem quebrar links
  partilhados ou guardados.
- **Quem gere categorias**: só admin/superadmin (não é algo que um funcionário
  individual deva poder criar, para evitar categorias duplicadas/confusas).
- **Serviços existentes**: migram automaticamente para a categoria com o
  mesmo nome — nenhum serviço fica "sem categoria".

## Alterações à base de dados (migração `20260810010000_categories`)

```sql
-- 1. Nova tabela de categorias
CREATE TABLE `categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(191) NOT NULL,
  `slug` VARCHAR(191) NOT NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  `is_active` BOOLEAN NOT NULL DEFAULT true,
  `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `categories_slug_key` (`slug`)
) DEFAULT CHARACTER SET utf8mb4;

-- 2. Popular com as 4 categorias atuais (mesmos slugs = URLs não quebram)
INSERT INTO `categories` (`name`, `slug`, `sort_order`) VALUES
  ('Barbearia', 'barbershop', 0),
  ('Tatuagem',  'tattoo',     1),
  ('Piercing',  'piercing',   2),
  ('Unhas',     'nails',      3);

-- 3. Novo campo em services, temporariamente opcional
ALTER TABLE `services` ADD COLUMN `category_id` INT NULL;

-- 4. Preencher category_id a partir do enum antigo
UPDATE `services` s JOIN `categories` c ON c.slug = s.category
  SET s.category_id = c.id;

-- 5. Tornar obrigatório + chave estrangeira
ALTER TABLE `services` MODIFY `category_id` INT NOT NULL;
ALTER TABLE `services` ADD CONSTRAINT `services_category_id_fkey`
  FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`);

-- 6. Remover a coluna antiga (só depois de confirmar que category_id está tudo certo)
ALTER TABLE `services` DROP COLUMN `category`;
```

**Nota importante para quando formos ao servidor:** os passos 5 e 6 só devem
correr depois de confirmarmos, com uma query `SELECT`, que nenhum serviço
ficou com `category_id` NULL no passo 4. Se algum serviço tiver uma categoria
que não bate certo com os 4 slugs (não deveria acontecer, mas convém
verificar), o passo 5 falha em vez de corromper dados silenciosamente — o que
é o comportamento que queremos.

**Armadilha encontrada e corrigida ao testar localmente:** a tabela nova
`categories` tem de ser criada com `COLLATE utf8mb4_unicode_ci` explícito —
sem isso, apanha a collation por omissão do servidor MySQL (que pode ser
diferente, ex. `utf8mb4_0900_ai_ci`), e o `JOIN` entre `categories` e
`services` no passo 4 rebenta com "Illegal mix of collations". Já está
corrigido no ficheiro da migração; fica aqui registado para não se repetir
a surpresa quando formos ao servidor (o MySQL de lá pode ter outra
collation por omissão ainda).

Migração dividida em dois ficheiros (`20260810010000_categories` e
`20260810020000_categories_finalize`) precisamente para poder correr a
verificação `SELECT` entre os dois passos, tal como aqui descrito. As duas
já foram aplicadas e confirmadas na base de dados **local**:

```
total  sem_categoria
29     0

Barbearia   16 serviços
Tatuagem     2 serviços
Piercing     2 serviços
Unhas        9 serviços
```

## Contrato da API (mudou)

Antes, `category` era sempre uma string fixa (`"barbershop"`). Agora:

- **Respostas** (`GET /services`, `/employees`, etc.): `category` passa a ser
  um objeto `{ id, name, slug, sortOrder, isActive }`, não uma string. Onde
  antes se lia `service.category`, passa a ler-se `service.category.slug`
  (para comparações/URLs) ou `service.category.name` (para mostrar).
- **Criar/editar um serviço** (`POST`/`PUT /services`): deixa de aceitar
  `category`, passa a aceitar `categoryId` (número).
- **Filtrar o catálogo** (`GET /services?category=barbershop`): não mudou —
  continua a aceitar o *slug* como texto na query string.
- **Novo**: `GET /categories` (público) e `GET/POST/PUT /admin/categories`
  (admin) para listar, criar, renomear, ativar/desativar e ordenar categorias.

## Ficheiros que vão mudar

| Camada | Ficheiro |
|---|---|
| Schema | `backend/prisma/schema.prisma` (novo model `Category`, `Service.category` → `Service.categoryId`) |
| Backend | `backend/src/routes/categories.js` (novo, público) |
| Backend | `backend/src/routes/admin/categories.js` (novo, CRUD + reorder) |
| Backend | `backend/src/routes/services.js`, `admin/services.js`, `employee/services.js` (usar categoryId) |
| Backoffice | `app/(dashboard)/categorias/` (novo ecrã) |
| Backoffice | `components/Sidebar.tsx` (nova entrada de menu) |
| Backoffice | `components/ServiceForm.tsx` (categoria dinâmica) |
| Backoffice | `app/(dashboard)/servicos/ServicosClient.tsx` (categorias dinâmicas em vez de `CATEGORY_ORDER` fixo) |
| Frontend | `src/app/servicos/page.tsx` (categorias dinâmicas) |
| Frontend | `src/lib/utils.ts` (`SERVICE_CATEGORIES` deixa de ser fixo) |
| Frontend | `src/components/Header/Header.tsx` (menu de categorias, se aplicável) |

## Extensão: subcategorias (1 nível)

Pedido adicional: dentro de "Barbearia", poder agrupar serviços em
subcategorias — Barba, Cabelo, Barba + Cabelo, Pack Premium — e a
funcionalidade tem de ficar genérica (criar outras subcategorias no futuro,
em qualquer categoria), não só estas 4.

- [x] 10. Migração: `categories.parent_id` (autorreferência, 1 nível só) —
       aplicada localmente com as 4 subcategorias de Barbearia (Barba,
       Cabelo, Barba + Cabelo, Pack Premium)
- [x] 11. Backend: `/categories` devolve a árvore (categoria + `children`);
       `/services?category=slug` resolve automaticamente para os serviços
       de todas as subcategorias quando o slug é de uma categoria "pai" —
       testado com 38 testes automáticos + verificação manual ao vivo
- [x] 12. Backend: seed (`prisma/seed.js`) cria as 4 subcategorias também
- [x] 13. Backoffice: ecrã Categorias com subcategorias indentadas, criar
       ("+ Subcategoria" por categoria de topo), renomear, ativar/desativar
       **e apagar** (com proteção: recusa se tiver serviços ou subcategorias)
- [x] 14. Backoffice: separadores/formulário de Serviços mostram categorias
       "folha" — uma categoria que ganhou subcategorias mas ainda tem
       serviços diretamente nela aparece como "(por organizar)" até serem
       movidos, para nunca desaparecerem do ecrã sem aviso
- [x] 15. Frontend `/servicos`: sub-cabeçalhos por subcategoria dentro da
       secção da categoria-mãe; serviços "por organizar" (ainda não movidos
       para uma subcategoria) aparecem primeiro, sem sub-cabeçalho
- [x] 16. Assistente de marcação: confirmado que não precisou de nenhuma
       alteração — a resolução de subcategorias no backend (ponto 11) já
       chega automaticamente a `/servicos?category=...`, usado pelo Passo 2

**Testado ao vivo de ponta a ponta:** criei "Barba"/"Cabelo"/etc no
backoffice, movi os 16 serviços de Barbearia para as subcategorias através
do formulário de edição, e confirmei no site público (`localhost:3000`) que
aparecem corretamente agrupados com sub-cabeçalhos.

**Nota sobre cache ao testar localmente:** o frontend usa
`next: { revalidate: 300 }` nos pedidos a `/services` e `/categories` — ao
testar mudanças no backoffice, se o site público não refletir logo, não é
bug, é só a cache de 5 min do Next.js. Reiniciar o `next start` local limpa-a
imediatamente (em produção resolve-se sozinho ao fim de 5 min).

**Limitação deliberada:** só um nível de profundidade (categoria →
subcategoria). Não dá para criar uma subcategoria dentro de outra
subcategoria — não foi pedido e complicaria a UI sem necessidade.

## Como publicar no servidor (preencher no fim, passo a passo)

_(por preencher quando chegarmos a esta fase)_
