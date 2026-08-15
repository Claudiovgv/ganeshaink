# Análise por área de negócio — Barbearia (design)

## Contexto

O backoffice já tem uma página "Estatísticas" (`/estatisticas`) com receita agregada por
categoria/serviço, seletor de período (semana/mês/ano com offset) e a regra de "o que conta
como receita" (`status = 'completed'` OU `status = 'confirmed'` com `endDatetime` no passado —
ver `backend/src/routes/admin/stats.js`).

O pedido agora é decompor essa visão por área de negócio (Barbearia, Tatuagens, Nails), e para
a Barbearia especificamente, acrescentar duas contas derivadas da receita: custo de material e
o valor/salário do barbeiro (% sobre a receita líquida). Só a Barbearia é construída nesta fase;
Tatuagens e Nails ficam no menu como placeholders "Em breve".

## Menu

Secção "Análise" na sidebar (`backoffice/components/Sidebar.tsx`, `ADMIN_NAV_ALL` e
`SUPERADMIN_NAV`) passa de 1 para 4 links ao mesmo nível:

```
Análise
  Estatísticas   (existente, inalterado)
  Barbearia      (novo — funcional)
  Tatuagens      (novo — página "Em breve")
  Nails          (novo — página "Em breve")
```

Permissão: mesma de Estatísticas (`view_stats`).

Nova entrada em "Definições": **Contas Barbearia** (`/definicoes/contas-barbearia`),
permissão `manage_settings` (mesmo padrão da página SMTP).

## Modelo de dados

Dois campos novos, nullable, no modelo `Employee` (schema.prisma):

```prisma
materialCost   Decimal? @db.Decimal(6, 2) @map("material_cost")
payoutPercent  Decimal? @db.Decimal(5, 2) @map("payout_percent")
```

Guardados por funcionário (não por categoria) porque a escolha do utilizador foi "por
barbeiro" — cada barbeiro pode ter o seu próprio valor de material e a sua própria %. Ficam
nullable porque só os barbeiros precisam de valores; outros funcionários (Vera, Ricardo) ficam
`null` até haver páginas equivalentes para Nails/Tatuagens.

Sem valor de default a nível de schema — a UI trata `null` como "0" nos cálculos e mostra um
aviso "Define o valor de material e % para {nome}" quando em falta, em vez de assumir 1€/30%
silenciosamente (evita um barbeiro ser calculado com valores errados por engano).

## Backend

### `PUT /v1/admin/employees/:id` (existente, `backend/src/routes/admin/employees.js`)

Passa a aceitar também `materialCost` e `payoutPercent` no body (mesmo padrão do `price` em
`admin/appointments.js`: `undefined` = não mexe, string vazia/`null` = limpa para `null`).

### `GET /v1/admin/stats/barbershop` (novo, `backend/src/routes/admin/stats.js` ou ficheiro
próprio `backend/src/routes/admin/stats-barbershop.js` montado em `/v1/admin/stats/barbershop`)

Query params: `period` (`week|month|year`), `offset` — mesmo `getRange()` já existente em
`stats.js` (extraído para um helper partilhado, ou duplicado se a extração for mais invasiva
que o necessário — decidir no plano).

Lógica:
1. Resolve a categoria de topo `barbershop` e os ids de todas as subcategorias (mesmo padrão do
   `GET /services?category=` público).
2. Busca appointments com `service.categoryId` num desses ids, `startDatetime` no intervalo do
   período, e a regra de receita já usada em `stats.js` (`completed` OU `confirmed` passado).
3. Agrupa por `employeeId`. Para cada barbeiro com pelo menos 1 marcação no período:
   - `count`, `revenue` (soma de `price ?? service.price`, mesma regra de override já existente)
   - `materialCost = count * (employee.materialCost ?? 0)`
   - `netRevenue = revenue - materialCost`
   - `payoutAmount = netRevenue * ((employee.payoutPercent ?? 0) / 100)`
   - `hasConfig = employee.materialCost != null && employee.payoutPercent != null` (para a UI
     avisar quando falta configurar)
4. Devolve também `totals` (soma de todos os barbeiros) e `range` (igual ao de `stats.js`).

Resposta:
```ts
{
  period, offset, range: { start, end },
  barbers: [{ employeeId, name, count, revenue, materialCost, netRevenue, payoutPercent, payoutAmount, hasConfig }],
  totals: { count, revenue, materialCost, netRevenue, payoutAmount },
}
```

## Frontend (backoffice)

### `app/(dashboard)/barbearia/page.tsx` + `BarbeariaClient.tsx`

- Seletor de período idêntico ao de `EstatisticasClient.tsx` (reaproveitar o mesmo padrão
  visual: botões Semana/Mês/Ano + `‹ range ›` + "Hoje").
- Card de resumo: Receita total, nº marcações, custo material total, valor total dos barbeiros.
- Duas abas horizontais abaixo do resumo: **Material** | **% Barbeiro**.
  - Aba Material: tabela por barbeiro — nome, marcações, valor material configurado, total.
  - Aba % Barbeiro: tabela por barbeiro — nome, receita líquida, % configurada, valor a pagar.
  - Barbeiro sem `hasConfig` mostra "—" nas colunas de valor e um aviso a apontar para
    Definições → Contas Barbearia.

### `app/(dashboard)/tatuagens/page.tsx`, `app/(dashboard)/nails/page.tsx`

Página estática simples: título + "Em breve — esta área ainda não está disponível."

### `app/(dashboard)/definicoes/contas-barbearia/page.tsx` + client

- Lista os funcionários ativos que têm pelo menos um serviço da categoria Barbearia atribuído
  (reaproveita `employee.services` já carregado noutras páginas), com dois campos por linha:
  Valor Material (€) e % Barbeiro, e um botão Guardar por linha (ou guardar tudo de uma vez —
  decidir no plano, tendendo para guardar tudo de uma vez por ser mais simples de usar com
  poucos barbeiros).

### Tipos e API client

- `Employee` (types.ts): + `materialCost: number | null`, `payoutPercent: number | null`.
- `lib/api.ts`: `employees.update` já aceita `data: object` genérico — não precisa de mudança
  de assinatura, só passar os novos campos no body a partir da UI.
- Novo tipo `BarbershopStats` + `stats.getBarbershop(period, offset)` em `lib/api.ts` e
  `actions.ts`.

## Fora de âmbito (por agora)

- Cálculos para Tatuagens/Nails (só a Barbearia fica funcional).
- Suporte a mais de um "material" por barbeiro (ex.: material diferente por serviço) — é um
  valor fixo por marcação, independentemente do serviço, conforme confirmado.
- Qualquer alteração ao `Setting` (chave-valor global) — os valores são sempre por funcionário.
