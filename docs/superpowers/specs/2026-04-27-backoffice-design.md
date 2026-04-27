# Ganesha Ink — Backoffice Design Spec

**Data:** 2026-04-27  
**Domínio:** app.ganeshaink.pt  
**Pasta:** `/backoffice/` (mesmo repositório que frontend e backend)

---

## Visão Geral

Aplicação de gestão interna para o studio Ganesha Ink. Serve dois tipos de utilizador — admin e funcionário — com a mesma interface mas sidebar adaptada ao role. O admin tem acesso a todas as secções; o funcionário tem acesso à sua agenda, serviços, horário, bloqueios e perfil.

---

## Stack

- **Next.js 14** App Router + TypeScript + Tailwind CSS v3
- **Fontes:** Playfair Display (títulos) + Inter (corpo) — mesmas do frontend público
- **Tema:** Dourado/preto idêntico ao site público (`#C9A84C`, `#0D0D0D`, `#1A1A1A`)
- **API:** Express em `localhost:3002/v1` (dev) / `api.ganeshaink.pt/v1` (prod)
- **Auth:** JWT em cookie httpOnly; middleware Next.js protege todas as rotas autenticadas

---

## Autenticação

- `POST /login` → recebe `{ email, password }` → devolve `{ token, user: { id, name, email, role } }`
- Token guardado em cookie httpOnly `ganesha_token`
- `GET /me` valida token e devolve user com role
- Role detectado no `AuthContext` → sidebar e rotas adaptam-se automaticamente
- Redirect para `/login` se não autenticado; redirect para `/` se já autenticado e acede a `/login`
- `POST /logout` limpa o cookie

---

## Layout

### Estrutura Base

```
┌─────────────────────────────────────────────┐
│  Sidebar (180px fixo)  │  Conteúdo principal │
│                        │                     │
│  Logo + nome           │  Top bar (título +  │
│  ─────────────         │  acções da página)  │
│  Menu items            │                     │
│  (condicionais         │  Conteúdo da rota   │
│   por role)            │                     │
│                        │                     │
│  ─────────────         │                     │
│  User info + logout    │                     │
└─────────────────────────────────────────────┘
```

### Sidebar — Admin

**Agenda:**
- 📅 Dashboard ← rota activa por defeito

**Marcações:**
- ✂️ Marcações
- 💬 Consultas *(badge com nº de pendentes)*

**Gestão:**
- 👥 Funcionários
- 🛠️ Serviços
- 📝 Blog
- 👤 Clientes

### Sidebar — Funcionário

- 📅 Agenda
- 🛠️ Serviços
- 🕐 Horário
- 🚫 Bloqueios
- 👤 Perfil

---

## Páginas

### `/login`
Formulário email + password. Sem layout de sidebar. Fundo escuro com logo Ganesha centrado.

---

### `/` — Dashboard (Admin) / Agenda (Funcionário)

**Calendário semanal:**
- Grelha de 15 min como unidade base de altura
- Blocos de marcação com altura proporcional à `durationMin` do serviço
- Cor distinta por funcionário (admin vê todos; funcionário vê só os seus)
- Navegação entre semanas (← →)
- "Hoje" destacado com círculo dourado
- Clicar num bloco abre modal com detalhe da marcação (estado, cliente, serviço, acções)
- Admin: botão "Nova Marcação" no top bar
- Dias sem horário (ex: domingo) mostram "Fechado" a cinzento

---

### `/marcacoes` — Marcações *(admin only)*

- Tabela com colunas: Data/hora · Cliente · Serviço · Funcionário · Estado · Acções
- Filtros: data, funcionário, estado (confirmada / cancelada / concluída)
- Botão "Nova Marcação" → modal com formulário (cliente, serviço, funcionário, data, hora)
- Acção por linha: alterar estado (confirmar / cancelar / concluir)

---

### `/consultas` — Consultas *(admin only)*

- Lista de pedidos com estado: `pending` / `scheduled` / `rejected`
- Filtro por estado
- Badge na sidebar com nº de `pending`
- Acções por linha:
  - **Agendar** → modal: escolher funcionário + data + hora → cria marcação automaticamente
  - **Rejeitar** → muda estado para `rejected`
- Detalhe expansível: nome cliente, email, telefone, serviço, descrição do pedido

---

### `/funcionarios` — Funcionários *(admin only)*

- Tabela: nome · email · serviços associados · estado (activo/inactivo)
- Botão "Novo Funcionário" → formulário: nome, email, password, bio, role, serviços
- Editar: nome, bio, estado, serviços associados

---

### `/servicos` — Serviços *(admin + funcionário)*

- Tabela agrupada por categoria: Barbearia · Tatuagem · Piercing · Unhas
- Colunas: nome · duração · preço · requer consulta · activo
- Botão "Novo Serviço" → formulário: nome, categoria, descrição, duração (min), preço, requer consulta
- Editar e desactivar serviços existentes
- **Backend:** Admin usa `/admin/services`; funcionário usa novo endpoint `/employee/services` (a criar)

---

### `/blog` — Blog *(admin only)*

- Tabela de posts: título · estado (rascunho/publicado) · data · autor
- Botão "Novo Post" → editor com: título, conteúdo (textarea markdown), excerpt, cover image URL, SEO title/description, toggle publicar
- Editar e eliminar posts existentes

---

### `/clientes` — Clientes *(admin only)*

- Tabela read-only: nome · email · telefone · nº marcações
- Sem criar/editar — dados vêm das marcações existentes

---

### `/horario` — Horário Semanal *(funcionário only)*

- Tabela com dias da semana (Seg–Dom)
- Por dia: toggle activo + hora início + hora fim
- Guardar actualiza `PUT /employee/schedule`

---

### `/bloqueios` — Bloqueios / Férias *(funcionário only)*

- Lista de bloqueios futuros: tipo (holiday/unavailable) · razão · período
- Botão "Novo Bloqueio" → formulário: tipo, razão, data início + hora, data fim + hora
- Eliminar bloqueio

---

### `/perfil` — Perfil *(funcionário only)*

- Editar: nome, bio, foto (URL)
- `PUT /employee/profile`

---

## Backend — Alterações Necessárias

Um novo endpoint a criar no backend (não existe ainda):

```
GET    /employee/services        → lista todos os serviços
POST   /employee/services        → cria serviço (global, requer role employee ou admin)
PUT    /employee/services/:id    → edita serviço
```

Middleware: `authenticate + requireEmployee` (funcionário ou admin).

---

## Componentes Partilhados

| Componente | Uso |
|---|---|
| `Sidebar` | Layout base, condicional por role |
| `TopBar` | Título da página + acções primárias |
| `CalendarWeek` | Dashboard + Agenda |
| `AppointmentModal` | Detalhe/criação de marcação |
| `DataTable` | Todas as tabelas (marcações, consultas, etc.) |
| `ServiceForm` | Criar/editar serviço (modal) |
| `Button` | Variantes gold/outline/ghost |
| `Badge` | Estado de marcações e consultas |
| `LoadingSpinner` | Estados de loading |

---

## Ficheiro `.env.local`

```
NEXT_PUBLIC_API_URL=http://localhost:3002/v1
```

---

## Considerações de Segurança

- Cookie httpOnly impede acesso via JS ao token
- Middleware Next.js verifica token em todas as rotas protegidas server-side
- Role verificado no servidor API (não apenas no frontend)
- Admin não pode aceder a rotas de employee e vice-versa na API
