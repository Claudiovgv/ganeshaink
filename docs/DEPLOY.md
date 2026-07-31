# Ganesha Ink — Guia de Deploy (cPanel PTiSTP, sem terminal)

## Arquitectura no servidor

| App | Tipo | Porta | URL de desenvolvimento |
|---|---|---|---|
| Backend API | Express.js (Node.js Passenger) | 3001 | `comfortable-peach-hawk.62-193-192-119.cpanel.site` |
| Frontend público | Next.js (Node.js Passenger) | 3000 | `magnificent-ivory-cobra.62-193-192-119.cpanel.site` |
| Backoffice | Next.js (Node.js Passenger) | 3002 | A criar no cPanel |

---

## Primeiro deploy (configuração inicial)

### Passo 1 — Criar a base de dados MySQL
No cPanel → MySQL Databases:
1. Criar base de dados: `ganesha_db`
2. Criar utilizador: `ganesha_user` com password segura
3. Dar TODOS os privilégios ao utilizador sobre a base de dados

### Passo 2 — Criar o ficheiro .env do backend
No cPanel → File Manager → navegar até `/home/ganesha/ganeshaink/backend/`
Criar o ficheiro `.env` com:
```
DATABASE_URL="mysql://ganesha_user:A_TUA_PASSWORD@localhost:3306/ganesha_db"
JWT_SECRET="uma-string-aleatoria-com-pelo-menos-32-caracteres"
JWT_EXPIRES_IN="7d"
PORT=3001
NODE_ENV="production"
FRONTEND_URL="https://comfortable-peach-hawk.62-193-192-119.cpanel.site"
BACKOFFICE_URL="https://O_DOMINIO_DO_BACKOFFICE"
SMTP_HOST="mail.ganeshaink.pt"
SMTP_PORT=587
SMTP_USER="noreply@ganeshaink.pt"
SMTP_PASS="A_PASSWORD_DO_EMAIL"
SMTP_FROM="Ganesha Ink <noreply@ganeshaink.pt>"
```

### Passo 3 — Criar a App Node.js para o Backend (se ainda não existir)
No cPanel → Setup Node.js App:
- Node.js version: 18
- Application mode: Production
- Application root: `ganeshaink/backend`
- Application URL: o subdomínio do backend
- Application startup file: `src/index.js`

### Passo 4 — Criar a App Node.js para o Frontend (se ainda não existir)
No cPanel → Setup Node.js App:
- Node.js version: 18
- Application mode: Production
- Application root: `ganeshaink/frontend`
- Application URL: o subdomínio do frontend
- Application startup file: `server.js`
- Environment variables: `NEXT_PUBLIC_API_URL=https://SEU_BACKEND_URL/v1`

### Passo 5 — Criar a App Node.js para o Backoffice (novo)
No cPanel → Setup Node.js App:
- Node.js version: 18
- Application mode: Production
- Application root: `ganeshaink/backoffice`
- Application URL: o subdomínio do backoffice (criar um subdomínio primeiro)
- Application startup file: `server.js`
- Environment variables:
  - `NEXT_PUBLIC_API_URL=https://SEU_BACKEND_URL/v1`
  - `NODE_ENV=production`

### Passo 6 — Ligar o repositório GitHub ao cPanel
No cPanel → Git Version Control:
1. Criar novo repositório
2. Clone URL: `https://github.com/Claudiovgv/ganeshaink.git`
3. Repository path: `/home/ganesha/ganeshaink`
4. Gravar

### Passo 7 — Primeiro Pull e Deploy
No cPanel → Git Version Control → ganeshaink → Manage → Pull or Deploy
- Clicar "Update from Remote"
- Clicar "Deploy HEAD Commit"
- O cPanel executa automaticamente o `.cpanel.yml` (instala deps, compila, reinicia)

---

## Deploys seguintes (actualizações de código)

1. No teu computador: fazer as alterações e `git push origin main`
2. No cPanel → Git Version Control → ganeshaink → Manage
3. Clicar "Update from Remote" (pull do GitHub)
4. Clicar "Deploy HEAD Commit" (executa o `.cpanel.yml`)
5. Aguardar — o cPanel mostra o log de execução

---

## Criar o primeiro utilizador admin

Depois do primeiro deploy e das migrações da base de dados, precisas de criar o utilizador admin.

**Opção A — via cPanel phpMyAdmin:**
1. cPanel → phpMyAdmin → seleccionar `ganesha_db`
2. Ir à tabela `User`
3. Inserir um registo com `role = 'admin'` e a password encriptada com bcrypt

**Opção B — adicionar ao seed.js e correr via .cpanel.yml:**
O ficheiro `backend/prisma/seed.js` já cria dados de exemplo. Podes adicionar um admin lá e correr uma vez.

---

## Apontar o domínio ganeshaink.pt

Quando tudo estiver a funcionar nos URLs temporários do cPanel:
1. No painel de DNS do domínio (onde compraste o `ganeshaink.pt`): apontar o A record para `62.193.192.119`
2. No cPanel → Domains: adicionar `ganeshaink.pt` e `www.ganeshaink.pt` apontando para o frontend
3. No cPanel → Domains: adicionar `api.ganeshaink.pt` apontando para o backend
4. No cPanel → Domains: adicionar `admin.ganeshaink.pt` apontando para o backoffice
5. Actualizar os `.env` com os URLs definitivos
6. Rebuild das apps (novo deploy)

---

## Transformar o Backoffice em App Android (futuro)

O backoffice pode ser convertido em APK Android através de **PWA + Capacitor**:

1. Adicionar `manifest.json` e service worker ao backoffice (torna-o uma PWA)
2. Instalar Capacitor: `npm install @capacitor/core @capacitor/cli @capacitor/android`
3. Fazer `npx cap init` e `npx cap add android`
4. Build do Next.js como export estático: `next build && next export`
5. Copiar para o Capacitor: `npx cap sync android`
6. Abrir no Android Studio: `npx cap open android`
7. Gerar o APK no Android Studio

**Pré-requisito**: precisas de ter Android Studio instalado no Mac.
**Nota**: para publicar na Google Play Store precisas de uma conta de developer ($25 único).
