# Notificações de email — Ganesha Ink

## Objectivo

O cliente continua a receber emails em todos os eventos de marcação/consulta. Staff e gestão só recebem se a célula correspondente estiver ligada no backoffice (SMTP → Quem recebe). Há um lembrete 24h antes, só para marcações confirmadas.

## Eventos

| `eventType` | Cliente | Profissional (só a marcação dele) | Gestão (admin/superadmin, todas) |
|---|---|---|---|
| `new_appointment` | pedido recebido (público) ou confirmada (criada no backoffice) | se ligado | se ligado |
| `appointment_confirmed` | sim | se ligado | se ligado |
| `appointment_cancelled` | sim | se ligado | se ligado |
| `appointment_completed` | sim | se ligado | se ligado |
| `consultation_received` | sim | se a consulta tiver profissional e estiver ligado | se ligado |
| `reminder_24h` | sim | se ligado | se ligado |

Quem não tiver linha na tabela de preferências está **desligado**. Se a mesma pessoa for profissional e gestão, envia-se **um** email.

Emails de cliente com placeholder `sem-contacto+…@ganeshaink.pt` não são enviados.

## Dados

- `notification_preferences`: `userId`, `eventType`, `enabled`, unique `(userId, eventType)`, cascade no user.
- `appointments.reminder_sent_at`: impede lembrete duplicado.

## Lembrete 24h

Cron a cada 15 minutos (não corre em `NODE_ENV=test`).

Critérios: `status = confirmed`, `reminderSentAt` null, `startDatetime > now`, `startDatetime <= now + 24h`, e a marcação foi criada pelo menos 24h antes do início (marcações de última hora não recebem “lembrete 24h”).

Fuso: o `startDatetime` já está em UTC; comparar com `Date.now()`.

## SMTP no backoffice

Três zonas no mesmo ecrã (`/definicoes/smtp`), permissão `manage_settings`:

1. Servidor — config actual
2. Quem recebe — grelha utilizador × evento
3. Testes — um envio por tipo de template para um email à escolha (dados de exemplo, não uma marcação real)

## API

- `GET /v1/admin/settings/notifications`
- `PUT /v1/admin/settings/notifications` — `{ preferences: [{ userId, eventType, enabled }] }`
- `POST /v1/admin/settings/smtp/test-template` — `{ eventType, testEmail }`

## Falhas SMTP

`sendMail` continua fire-and-forget: a marcação não falha se o email falhar. Testes de SMTP/template continuam a devolver o erro ao admin.
