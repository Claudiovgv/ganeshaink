# Guia de Deploy — Ganesha Ink no cPanel PTiSTP
### Passo a passo sem acesso a terminal

---

## Antes de começar — Perceber a arquitectura

Este projecto tem **3 aplicações** que precisam de correr no servidor:

```
┌─────────────────────────────────────────────────────────┐
│                     cPanel PTiSTP                        │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Backend    │  │   Frontend   │  │  Backoffice  │  │
│  │  Express.js  │  │   Next.js    │  │   Next.js    │  │
│  │  porta 3001  │  │  porta 3000  │  │  porta 3002  │  │
│  │  src/index.js│  │  server.js   │  │  server.js   │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
│         │                 │                  │          │
│         └─────────────────┴──────────────────┘          │
│                           │                             │
│                      MySQL (3306)                        │
└─────────────────────────────────────────────────────────┘
```

- **Backend**: A API que gere todos os dados (marcações, clientes, serviços, etc.)
- **Frontend**: O site público que os clientes vêem
- **Backoffice**: O painel de gestão para os funcionários e o admin

O frontend e o backoffice **falam com o backend** para obter e guardar dados.
**Não é necessário Firebase** — toda a informação está na base de dados MySQL.

---

## FASE 1 — Base de dados MySQL

### Passo 1.1 — Criar a base de dados
No cPanel → **MySQL Databases**:

1. Em "Create New Database", escrever `ganesha_db` → clicar "Create Database"
2. Em "MySQL Users" → "Add New User":
   - Username: `ganesha_user`
   - Password: criar uma password segura (guardar — vais precisar dela)
   - Clicar "Create User"
3. Em "Add User To Database":
   - User: `ganesha_user`
   - Database: `ganesha_db`
   - Clicar "Add"
   - Na página seguinte: seleccionar "ALL PRIVILEGES" → "Make Changes"

---

## FASE 2 — Configurar o Git no cPanel

### Passo 2.1 — Ligar o repositório GitHub
No cPanel → **Git Version Control** → "Create":

- Clone URL: `https://github.com/Claudiovgv/ganeshaink.git`
- Repository Path: `/home/ganesha/ganeshaink`
- Repository Name: `ganeshaink`
- Clicar "Create"

O cPanel vai fazer o clone do repositório.

---

## FASE 3 — Apps Node.js

Precisas de criar **3 aplicações** Node.js. O backend e frontend podem já existir — confirma antes de criar.

### Passo 3.1 — App do Backend (confirmar/criar)
No cPanel → **Setup Node.js App** → "Create Application":

| Campo | Valor |
|---|---|
| Node.js version | 18 |
| Application mode | Production |
| Application root | `ganeshaink/backend` |
| Application URL | (escolher o subdomínio do backend) |
| Application startup file | `src/index.js` |

Após criar, clicar em "Edit" na app e adicionar as **Environment Variables**:

| Variável | Valor |
|---|---|
| `NODE_ENV` | `production` |
| `PORT` | `3001` |
| `DATABASE_URL` | `mysql://ganesha_user:A_TUA_PASSWORD@localhost:3306/ganesha_db` |
| `JWT_SECRET` | uma string aleatória com 32+ caracteres (ex: `ganeshaink-secret-key-2024-xpto`) |
| `JWT_EXPIRES_IN` | `7d` |
| `FRONTEND_URL` | URL do frontend (ver passo 3.2) |
| `BACKOFFICE_URL` | URL do backoffice (ver passo 3.3) |

> **Importante**: Substituir `A_TUA_PASSWORD` pela password do `ganesha_user` criada no Passo 1.1.

### Passo 3.2 — App do Frontend (confirmar/criar)
No cPanel → **Setup Node.js App** → "Create Application":

| Campo | Valor |
|---|---|
| Node.js version | 18 |
| Application mode | Production |
| Application root | `ganeshaink/frontend` |
| Application URL | (escolher o subdomínio do frontend) |
| Application startup file | `server.js` |

Environment Variables:

| Variável | Valor |
|---|---|
| `NODE_ENV` | `production` |
| `PORT` | `3000` |
| `NEXT_PUBLIC_API_URL` | URL completo do backend + `/v1`  (ex: `https://comfortable-peach-hawk.62-193-192-119.cpanel.site/v1`) |

> **Nota**: O `NEXT_PUBLIC_API_URL` tem de estar definido **antes** de fazer o build, porque o Next.js embute este valor no código durante a compilação.

### Passo 3.3 — App do Backoffice (nova — criar agora)
No cPanel → **Setup Node.js App** → "Create Application":

| Campo | Valor |
|---|---|
| Node.js version | 18 |
| Application mode | Production |
| Application root | `ganeshaink/backoffice` |
| Application URL | (criar um subdomínio novo, ex: `admin.ganeshaink.pt` ou usar um temporário) |
| Application startup file | `server.js` |

Environment Variables:

| Variável | Valor |
|---|---|
| `NODE_ENV` | `production` |
| `PORT` | `3002` |
| `NEXT_PUBLIC_API_URL` | URL completo do backend + `/v1` (o mesmo que no frontend) |

---

## FASE 4 — Criar o ficheiro .env do Backend

O ficheiro `.env` **não é commitado no Git** por segurança, por isso tens de o criar manualmente.

No cPanel → **File Manager**:
1. Navegar até `/home/ganesha/ganeshaink/backend/`
2. Clicar "New File" → nome: `.env`
3. Clicar com o botão direito no ficheiro → "Edit"
4. Colar o seguinte conteúdo (substituindo os valores):

```
DATABASE_URL="mysql://ganesha_user:A_TUA_PASSWORD@localhost:3306/ganesha_db"
JWT_SECRET="uma-string-aleatoria-longa-aqui-minimo-32-chars"
JWT_EXPIRES_IN="7d"
PORT=3001
NODE_ENV="production"
FRONTEND_URL="https://URL_DO_FRONTEND"
BACKOFFICE_URL="https://URL_DO_BACKOFFICE"
SMTP_HOST="mail.ganeshaink.pt"
SMTP_PORT=587
SMTP_USER="noreply@ganeshaink.pt"
SMTP_PASS="PASSWORD_DO_EMAIL"
SMTP_FROM="Ganesha Ink <noreply@ganeshaink.pt>"
```

5. Clicar "Save Changes"

> **Nota sobre emails**: Se ainda não tens o email configurado, podes deixar as variáveis SMTP em branco por agora — o site funciona sem elas. Os emails só são necessários para notificações de marcação.

---

## FASE 5 — Primeiro Deploy

### Passo 5.1 — Fazer o primeiro Pull e Deploy
No cPanel → **Git Version Control** → clicar em "Manage" ao lado de `ganeshaink`:

1. Clicar **"Update from Remote"** — isto faz o pull do código do GitHub
2. Clicar **"Deploy HEAD Commit"** — isto executa o `.cpanel.yml`

O `.cpanel.yml` faz automaticamente:
- `npm install` no backend
- Migração da base de dados (cria todas as tabelas)
- `npm install` no frontend
- `npm run build` no frontend (compila o Next.js)
- `npm install` no backoffice
- `npm run build` no backoffice (compila o Next.js)
- Reinicia todas as apps

Este processo demora **5 a 15 minutos** (a compilação do Next.js é lenta).

### Passo 5.2 — Verificar o deploy
O cPanel mostra um log de execução. Procura por erros. Se correu bem, deves ver algo como:
```
> Frontend ready on port 3000
> Backoffice ready on port 3002
```

---

## FASE 6 — Criar o utilizador Admin

Para entrares no backoffice precisas de criar um utilizador admin na base de dados.

No cPanel → **phpMyAdmin**:
1. Seleccionar `ganesha_db` na lista da esquerda
2. Clicar na tabela `User`
3. Clicar "Insert" (separador no topo)
4. Preencher os campos:

| Campo | Valor |
|---|---|
| `name` | `Admin` |
| `email` | `admin@ganeshaink.pt` |
| `password` | **VER ABAIXO** |
| `role` | `admin` |

**Como gerar a password encriptada (bcrypt)**:
A password tem de estar em formato bcrypt. Usa um gerador online como `bcrypt-generator.com`:
- Password que queres: a que escolheres (ex: `GaneshaAdmin2024!`)
- Cost factor: `10`
- O site gera o hash — copia esse hash para o campo `password` no phpMyAdmin

5. Clicar "Go" para gravar

---

## FASE 7 — Testar tudo

1. **Backend**: Abrir o URL do backend no browser → deve aparecer `{"error":"Route not found"}` (isso é normal — significa que a API está a responder)

2. **Frontend**: Abrir o URL do frontend → deve aparecer a página inicial do Ganesha Ink

3. **Backoffice**: Abrir o URL do backoffice → deve redirigir para `/login`
   - Fazer login com `admin@ganeshaink.pt` e a password que escolheste
   - Deves ver o dashboard com o calendário

---

## FASE 8 — Deploys seguintes (updates de código)

Sempre que fizeres alterações no código:

1. No teu Mac: `git push origin main`
2. No cPanel → Git Version Control → ganeshaink → Manage
3. Clicar "Update from Remote"
4. Clicar "Deploy HEAD Commit"
5. Aguardar (5-15 min para builds completos, ~1 min para só o backend)

---

## FASE 9 — Apontar o domínio ganeshaink.pt (quando estiver tudo a funcionar)

Quando testares e confirmares que tudo funciona nos URLs temporários do cPanel:

### Passo 9.1 — Criar subdomínios no cPanel
No cPanel → **Domains** ou **Subdomains**:
- `ganeshaink.pt` → apontar para o frontend
- `api.ganeshaink.pt` → apontar para o backend
- `admin.ganeshaink.pt` → apontar para o backoffice

### Passo 9.2 — Apontar o DNS
No painel onde compraste o domínio `ganeshaink.pt`:
- Tipo A: `@` → `62.193.192.119`
- Tipo A: `www` → `62.193.192.119`
- Tipo A: `api` → `62.193.192.119`
- Tipo A: `admin` → `62.193.192.119`

### Passo 9.3 — SSL (HTTPS)
No cPanel → **SSL/TLS** → "AutoSSL" — instalar certificados para todos os domínios.

### Passo 9.4 — Actualizar os .env e variáveis de ambiente
- No File Manager: actualizar o `.env` do backend com os novos URLs
- Nas apps Node.js: actualizar o `NEXT_PUBLIC_API_URL` com `https://api.ganeshaink.pt/v1`
- Fazer um novo deploy para recompilar com os novos URLs

---

## Resolução de Problemas

| Problema | Possível causa | Solução |
|---|---|---|
| Backend retorna 500 | `.env` mal configurado | File Manager → verificar o `.env` |
| Frontend mostra erro de API | `NEXT_PUBLIC_API_URL` errado | Nas env vars da app Node.js → corrigir → rebuild |
| Backoffice não carrega | Build falhou | Ver log do deploy no Git Version Control |
| Login no backoffice falha | Utilizador não existe | phpMyAdmin → criar utilizador admin |
| Build muito lento | Normal no cPanel | Aguardar até 15 min |

---

## Resumo rápido (checklist)

- [ ] Criar MySQL: base de dados `ganesha_db` + utilizador `ganesha_user`
- [ ] Criar App Node.js: Backend (`ganeshaink/backend`, startup: `src/index.js`)
- [ ] Criar App Node.js: Frontend (`ganeshaink/frontend`, startup: `server.js`)
- [ ] Criar App Node.js: Backoffice (`ganeshaink/backoffice`, startup: `server.js`)
- [ ] Definir variáveis de ambiente nas 3 apps
- [ ] Criar ficheiro `.env` no backend via File Manager
- [ ] Git Version Control: ligar o repo GitHub
- [ ] Deploy: Update from Remote → Deploy HEAD Commit
- [ ] phpMyAdmin: criar utilizador admin
- [ ] Testar: backend, frontend, backoffice
- [ ] (Mais tarde) Apontar domínio ganeshaink.pt
