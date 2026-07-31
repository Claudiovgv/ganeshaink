# Ganesha Ink — Documento do Projecto

## O que é este projecto

Site público + sistema de reservas online para a **Ganesha Ink**, um estúdio que oferece serviços de:
- Tatuagem
- Barbearia
- Piercing
- Unhas

O objectivo é ter um site profissional onde os clientes podem ver o trabalho, conhecer os artistas e **marcar uma sessão online** — sem precisar de telefonar.

Além disso, os funcionários têm um **backoffice** para gerir as marcações, os seus horários e o seu perfil.

---

## Stack técnica

| Parte | Tecnologia |
|---|---|
| Frontend público | Next.js 14 + Tailwind CSS |
| Backoffice (funcionários) | Next.js 14 + Tailwind CSS |
| API / Backend | Express.js + Node.js |
| Base de dados | MySQL + Prisma ORM |
| Servidor | cPanel (PTiSTP) com suporte Node.js |

---

## Frontend público — Páginas existentes

O design e as páginas já estão feitos. **Não mudar o frontend.**

| Página | Rota | Descrição |
|---|---|---|
| Home | `/` | Página principal com hero, serviços em destaque |
| Serviços | `/servicos` | Lista de todos os serviços e preços |
| Artistas | `/artistas` | Perfis dos tatuadores/barbeiros |
| Galeria | `/galeria` | Portfólio de trabalhos |
| Marcar | `/marcar` | Formulário de marcação de sessão |
| Consulta | `/consulta` | Pedido de consulta gratuita |
| Blog | `/blog` | Artigos e novidades |
| Contacto | `/contacto` | Formulário de contacto + localização |

---

## Backend — API (já completo)

A API Express está **100% implementada e testada** (28/28 testes a passar).

### Rotas públicas
- `POST /v1/auth/login` — login de funcionários
- `GET /v1/employees` — lista de artistas
- `GET /v1/services` — lista de serviços
- `GET /v1/availability` — disponibilidade para marcações
- `POST /v1/appointments` — criar marcação
- `GET/POST /v1/consultations` — pedidos de consulta
- `GET /v1/blog` — artigos do blog

### Rotas admin (gestão completa)
- `/v1/admin/appointments` — gerir todas as marcações
- `/v1/admin/employees` — gerir funcionários
- `/v1/admin/services` — gerir serviços
- `/v1/admin/clients` — ver clientes
- `/v1/admin/blog` — gerir artigos

### Rotas funcionário (área pessoal)
- `/v1/employee/appointments` — as minhas marcações
- `/v1/employee/schedule` — o meu horário
- `/v1/employee/time-blocks` — bloquear dias/horas
- `/v1/employee/profile` — editar o meu perfil

---

## Backoffice — O que é preciso construir

O backoffice é uma aplicação separada para uso **interno** (funcionários e admin).

### Quem usa
- **Admin** (dono/gerente): vê tudo, gere tudo
- **Funcionário** (artista/barbeiro): vê apenas as suas marcações e gere o seu horário

### Funcionalidades necessárias

#### Para o Admin
- [ ] Dashboard: resumo do dia (marcações, receita, ocupação)
- [ ] Calendário: ver todas as marcações de todos os funcionários
- [ ] Marcações: criar, editar, cancelar, marcar como concluída
- [ ] Clientes: ver histórico de cada cliente
- [ ] Funcionários: criar, editar, activar/desactivar
- [ ] Serviços: criar, editar preços e duração
- [ ] Blog: criar e publicar artigos

#### Para o Funcionário
- [ ] O meu calendário: as minhas marcações do dia/semana
- [ ] Bloquear horário: marcar dias de folga ou horas ocupadas
- [ ] Ver detalhes do cliente: histórico, notas
- [ ] Editar o meu perfil: foto, bio, especialidades

---

## Base de dados — Tabelas (já criadas)

- `Employee` — funcionários e artistas
- `Service` — serviços oferecidos
- `Client` — clientes
- `Appointment` — marcações
- `Consultation` — pedidos de consulta
- `EmployeeService` — quais serviços cada funcionário faz
- `EmployeeSchedule` — horário semanal de cada funcionário
- `TimeBlock` — bloqueios de horário
- `BlogPost` — artigos do blog

---

## Servidor — Como está configurado (PTiSTP)

- **Hosting:** cPanel (PTiSTP, reseller)
- **Conta:** ganesha
- **Node.js:** v18.20.8 (via nodevenv do cPanel)
- **MySQL:** base de dados `ganesha_db`, utilizador `ganesha_user`
- **Apps configuradas:**
  - Backend: `comfortable-peach-hawk.62-193-192-119.cpanel.site`
  - Frontend: `magnificent-ivory-cobra.62-193-192-119.cpanel.site`
- **GitHub:** `https://github.com/Claudiovgv/ganeshaink.git`
- **SSH:** não disponível neste servidor
- **Terminal cPanel:** não disponível neste servidor

### Problema com este servidor
O cPanel desta conta não tem SSH nem Terminal, o que torna o deploy complicado porque não é possível correr comandos como `npm run build` directamente no servidor.

### Solução implementada — Git Autodeploy via .cpanel.yml
O `.cpanel.yml` contém todas as tarefas de build e restart. O processo é:
1. Push para GitHub
2. No cPanel → Git Version Control → Pull
3. O cPanel executa automaticamente as tarefas do `.cpanel.yml`

Ver `docs/DEPLOY.md` para o guia passo a passo completo.

---

## Estado actual do projecto (2026-06-04)

| Parte | Estado |
|---|---|
| Backend API | ✅ Completo (código + 28 testes) |
| Base de dados (schema) | ✅ Completo |
| Frontend público | ✅ Páginas criadas (design final) |
| Backoffice | ✅ Construído (marcações, clientes, funcionários, serviços, blog, consultas, perfil) |
| Deploy automático (.cpanel.yml) | ✅ Configurado (backend + frontend + backoffice) |
| Emails | 🔲 Por implementar |
| Domínio apontado | 🔲 Aguarda tudo estar funcional no servidor |

---

## Próximos passos quando retomarmos

1. **Construir o backoffice** — começar pelo calendário e gestão de marcações do admin
2. **Deploy simplificado** — documentar um processo passo a passo que qualquer pessoa consegue seguir
3. **Testar tudo** com dados reais antes de apontar o domínio
4. **Apontar o domínio** `ganeshaink.pt` para o servidor

---

## Notas para futuros projectos similares

Este projecto serve de base para outros negócios (barbearias, spas, clínicas, etc.).
A estrutura é a mesma — muda apenas:
- Nome e branding
- Tipos de serviços
- Número de funcionários
- Cores e imagens do frontend

O backend e o backoffice podem ser reutilizados quase sem alterações.
