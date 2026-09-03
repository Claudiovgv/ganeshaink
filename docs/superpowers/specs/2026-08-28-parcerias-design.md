# Parcerias — Ganesha Ink

## Objectivo

Catálogo interno de parcerias (clubes, etc.) com percentagem de desconto. O cliente marca no site ao preço de catálogo. No backoffice, o staff aplica a parceria à marcação; o preço gravado passa a ser o valor com desconto e as estatísticas usam esse valor.

Não aparece no site público.

## Dados

`partnerships`: name, percent (0–100), extraFieldLabel (opcional), isActive, sortOrder.

`appointments`: partnershipId, extraFieldValue, price (guarda o valor com desconto quando há parceria).

Mudar a % da parceria não altera marcações antigas.

## Fluxos

- Sem API pública de parcerias. `POST /v1/appointments` ignora `partnershipId`.
- Admin CRUD `/v1/admin/partnerships` (permissão `manage_appointments`).
- Admin create/update de marcações aceitam `partnershipId` + `extraFieldValue`. Com parceria, o servidor calcula sempre o desconto a partir do preço de catálogo. Sem parceria, o preço volta ao catálogo (salvo override explícito).
- Apagar parceria com marcações: 409, desactivar em vez disso.

## UI

- Backoffice: menu Parcerias (Gestão) para o catálogo.
- Backoffice: nova/editar marcação — escolher parceria; detalhe da marcação + coluna nos clientes (última parceria).
- Site: sem selector de parceria.
