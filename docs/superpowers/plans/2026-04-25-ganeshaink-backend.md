# Ganesha Ink — Backend API Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete REST API for Ganesha Ink — autenticação, marcações, disponibilidade, consultas e blog — em Node.js/Express com MySQL via Prisma.

**Architecture:** Express app em api.ganeshaink.pt/v1. Todas as datas guardadas em UTC no MySQL, convertidas para/de Europe/Lisbon na entrada/saída. JWT auth com dois roles: admin e employee. Endpoints públicos sem auth.

**Tech Stack:** Node.js 18+, Express 4, Prisma 5 (MySQL), jsonwebtoken, bcryptjs, date-fns-tz, uuid, express-rate-limit, node-cron, Jest, Supertest

---

## File Map

```
backend/
├── prisma/
│   └── schema.prisma                  ← definição completa do schema
├── src/
│   ├── config/
│   │   └── database.js                ← Prisma client singleton
│   ├── middleware/
│   │   ├── auth.js                    ← JWT verify + role check
│   │   └── rateLimit.js               ← rate limiting para rotas públicas
│   ├── services/
│   │   └── availability.service.js    ← cálculo de slots livres
│   ├── routes/
│   │   ├── auth.js
│   │   ├── employees.js               ← GET /employees, GET /employees/:id
│   │   ├── services.js                ← GET /services
│   │   ├── availability.js            ← GET /availability/:id
│   │   ├── appointments.js            ← POST/GET/DELETE /appointments
│   │   ├── consultations.js           ← POST/GET /consultations
│   │   ├── blog.js                    ← GET /blog, GET /blog/:slug
│   │   ├── admin/
│   │   │   ├── appointments.js
│   │   │   ├── consultations.js
│   │   │   ├── employees.js
│   │   │   ├── services.js
│   │   │   ├── blog.js
│   │   │   └── clients.js
│   │   └── employee/
│   │       ├── appointments.js
│   │       ├── schedule.js
│   │       ├── timeBlocks.js
│   │       └── profile.js
│   └── index.js                       ← express app + route mounting
├── tests/
│   ├── setup.js                       ← jest setup, prisma test client
│   ├── auth.test.js
│   ├── employees.test.js
│   ├── services.test.js
│   ├── availability.test.js
│   ├── appointments.test.js
│   ├── consultations.test.js
│   └── admin.test.js
├── .env.example
└── package.json
```

---

## Task 1: Dependências e configuração do projeto

**Files:**
- Create: `backend/package.json`
- Create: `backend/.env.example`
- Create: `backend/.env` (local, não commitar)
- Create: `backend/src/config/database.js`

- [ ] **Step 1: Substituir package.json com as dependências correctas**

```json
{
  "name": "ganeshaink-api",
  "version": "1.0.0",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "jest --runInBand --forceExit",
    "test:watch": "jest --watch --runInBand",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:studio": "prisma studio"
  },
  "dependencies": {
    "@prisma/client": "^5.22.0",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "date-fns": "^3.6.0",
    "date-fns-tz": "^3.2.0",
    "dotenv": "^16.4.0",
    "express": "^4.21.0",
    "express-rate-limit": "^7.4.0",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5-lts.1",
    "node-cron": "^3.0.3",
    "nodemailer": "^6.9.15",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "nodemon": "^3.1.0",
    "prisma": "^5.22.0",
    "supertest": "^7.0.0"
  },
  "jest": {
    "testEnvironment": "node",
    "setupFilesAfterFramework": ["./tests/setup.js"],
    "testTimeout": 15000
  }
}
```

- [ ] **Step 2: Instalar dependências**

```bash
cd backend
npm install
```

Expected: sem erros, `node_modules/` criado.

- [ ] **Step 3: Criar .env.example**

```
DATABASE_URL="mysql://user:password@localhost:3306/ganeshaink"
TEST_DATABASE_URL="mysql://user:password@localhost:3306/ganeshaink_test"
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="7d"
PORT=3002
SMTP_HOST="mail.ganeshaink.pt"
SMTP_PORT=587
SMTP_USER="noreply@ganeshaink.pt"
SMTP_PASS="your-smtp-password"
SMTP_FROM="Ganesha Ink <noreply@ganeshaink.pt>"
FRONTEND_URL="http://localhost:3000"
NODE_ENV="development"
```

- [ ] **Step 4: Criar .env com valores locais** (não commitar — já está no .gitignore)

```
DATABASE_URL="mysql://root:@localhost:3306/ganeshaink"
TEST_DATABASE_URL="mysql://root:@localhost:3306/ganeshaink_test"
JWT_SECRET="dev-secret-key-change-in-production"
JWT_EXPIRES_IN="7d"
PORT=3002
NODE_ENV="development"
```

- [ ] **Step 5: Criar src/config/database.js**

```javascript
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
});

module.exports = prisma;
```

- [ ] **Step 6: Adicionar .env ao .gitignore**

```bash
echo ".env" >> backend/.gitignore
echo "node_modules/" >> backend/.gitignore
```

- [ ] **Step 7: Commit**

```bash
cd backend
git add package.json .env.example .gitignore src/config/database.js
git commit -m "chore: setup backend dependencies and config"
```

---

## Task 2: Prisma Schema e migração MySQL

**Files:**
- Create: `backend/prisma/schema.prisma`

- [ ] **Step 1: Inicializar Prisma**

```bash
cd backend
npx prisma init --datasource-provider mysql
```

Expected: cria `prisma/schema.prisma` e `prisma/.env` (ignorar, usamos `.env` na raiz).

- [ ] **Step 2: Substituir prisma/schema.prisma com schema completo**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

enum Role {
  admin
  employee
}

enum ServiceCategory {
  barbershop
  tattoo
  piercing
  nails
}

enum TimeBlockType {
  vacation
  break
  custom
}

enum AppointmentStatus {
  pending
  confirmed
  cancelled
  completed
}

enum ConsultationStatus {
  pending
  approved
  rejected
  scheduled
}

model User {
  id        Int        @id @default(autoincrement())
  name      String
  email     String     @unique
  password  String
  role      Role       @default(employee)
  createdAt DateTime   @default(now()) @map("created_at")
  employee  Employee?
  blogPosts BlogPost[]

  @@map("users")
}

model Employee {
  id            Int                   @id @default(autoincrement())
  userId        Int                   @unique @map("user_id")
  name          String
  bio           String?               @db.Text
  photoUrl      String?               @map("photo_url")
  isActive      Boolean               @default(true) @map("is_active")
  createdAt     DateTime              @default(now()) @map("created_at")
  user          User                  @relation(fields: [userId], references: [id])
  services      EmployeeService[]
  workSchedules WorkSchedule[]
  timeBlocks    TimeBlock[]
  appointments  Appointment[]
  consultations ConsultationRequest[]

  @@map("employees")
}

model Service {
  id                   Int                   @id @default(autoincrement())
  name                 String
  category             ServiceCategory
  description          String?               @db.Text
  durationMin          Int                   @map("duration_min")
  price                Decimal               @db.Decimal(8, 2)
  requiresConsultation Boolean               @default(false) @map("requires_consultation")
  isActive             Boolean               @default(true) @map("is_active")
  employees            EmployeeService[]
  appointments         Appointment[]
  consultations        ConsultationRequest[]

  @@map("services")
}

model EmployeeService {
  employeeId Int      @map("employee_id")
  serviceId  Int      @map("service_id")
  employee   Employee @relation(fields: [employeeId], references: [id])
  service    Service  @relation(fields: [serviceId], references: [id])

  @@id([employeeId, serviceId])
  @@map("employee_services")
}

model WorkSchedule {
  id         Int      @id @default(autoincrement())
  employeeId Int      @map("employee_id")
  dayOfWeek  Int      @map("day_of_week")
  startTime  String   @map("start_time")
  endTime    String   @map("end_time")
  isActive   Boolean  @default(true) @map("is_active")
  employee   Employee @relation(fields: [employeeId], references: [id])

  @@map("work_schedules")
}

model TimeBlock {
  id            Int           @id @default(autoincrement())
  employeeId    Int           @map("employee_id")
  startDatetime DateTime      @map("start_datetime")
  endDatetime   DateTime      @map("end_datetime")
  type          TimeBlockType
  reason        String?
  createdAt     DateTime      @default(now()) @map("created_at")
  employee      Employee      @relation(fields: [employeeId], references: [id])

  @@map("time_blocks")
}

model Appointment {
  id            Int                  @id @default(autoincrement())
  clientName    String               @map("client_name")
  clientEmail   String               @map("client_email")
  clientPhone   String               @map("client_phone")
  employeeId    Int                  @map("employee_id")
  serviceId     Int                  @map("service_id")
  startDatetime DateTime             @map("start_datetime")
  endDatetime   DateTime             @map("end_datetime")
  status        AppointmentStatus    @default(confirmed)
  notes         String?              @db.Text
  cancelToken   String?              @unique @map("cancel_token")
  createdAt     DateTime             @default(now()) @map("created_at")
  employee      Employee             @relation(fields: [employeeId], references: [id])
  service       Service              @relation(fields: [serviceId], references: [id])
  consultation  ConsultationRequest?

  @@map("appointments")
}

model ConsultationRequest {
  id                     Int                @id @default(autoincrement())
  clientName             String             @map("client_name")
  clientEmail            String             @map("client_email")
  clientPhone            String             @map("client_phone")
  serviceId              Int                @map("service_id")
  employeeId             Int?               @map("employee_id")
  description            String             @db.Text
  referenceImages        Json?              @map("reference_images")
  status                 ConsultationStatus @default(pending)
  scheduledAppointmentId Int?               @unique @map("scheduled_appointment_id")
  createdAt              DateTime           @default(now()) @map("created_at")
  service                Service            @relation(fields: [serviceId], references: [id])
  employee               Employee?          @relation(fields: [employeeId], references: [id])
  scheduledAppointment   Appointment?       @relation(fields: [scheduledAppointmentId], references: [id])

  @@map("consultation_requests")
}

model BlogPost {
  id             Int       @id @default(autoincrement())
  title          String
  slug           String    @unique
  content        String    @db.LongText
  excerpt        String?   @db.Text
  coverImageUrl  String?   @map("cover_image_url")
  authorId       Int       @map("author_id")
  publishedAt    DateTime? @map("published_at")
  seoTitle       String?   @map("seo_title")
  seoDescription String?   @map("seo_description")
  isPublished    Boolean   @default(false) @map("is_published")
  author         User      @relation(fields: [authorId], references: [id])

  @@map("blog_posts")
}
```

- [ ] **Step 3: Criar as bases de dados MySQL**

```bash
# No terminal MySQL (ou cPanel phpMyAdmin)
# CREATE DATABASE ganeshaink CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
# CREATE DATABASE ganeshaink_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

- [ ] **Step 4: Correr a migração**

```bash
cd backend
npx prisma migrate dev --name init
```

Expected: `✔  Generated Prisma Client`, tabelas criadas no MySQL.

- [ ] **Step 5: Verificar tabelas criadas**

```bash
npx prisma studio
```

Expected: abre browser com todas as tabelas visíveis.

- [ ] **Step 6: Commit**

```bash
git add prisma/
git commit -m "feat: add prisma schema with all tables"
```

---

## Task 3: Express app base

**Files:**
- Create/Modify: `backend/src/index.js`
- Create: `backend/src/middleware/rateLimit.js`

- [ ] **Step 1: Criar src/index.js**

```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const employeesRoutes = require('./routes/employees');
const servicesRoutes = require('./routes/services');
const availabilityRoutes = require('./routes/availability');
const appointmentsRoutes = require('./routes/appointments');
const consultationsRoutes = require('./routes/consultations');
const blogRoutes = require('./routes/blog');

const adminAppointmentsRoutes = require('./routes/admin/appointments');
const adminConsultationsRoutes = require('./routes/admin/consultations');
const adminEmployeesRoutes = require('./routes/admin/employees');
const adminServicesRoutes = require('./routes/admin/services');
const adminBlogRoutes = require('./routes/admin/blog');
const adminClientsRoutes = require('./routes/admin/clients');

const employeeAppointmentsRoutes = require('./routes/employee/appointments');
const employeeScheduleRoutes = require('./routes/employee/schedule');
const employeeTimeBlocksRoutes = require('./routes/employee/timeBlocks');
const employeeProfileRoutes = require('./routes/employee/profile');

const app = express();

app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    process.env.BACKOFFICE_URL || 'http://localhost:3001',
  ],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public routes
app.use('/v1/auth', authRoutes);
app.use('/v1/employees', employeesRoutes);
app.use('/v1/services', servicesRoutes);
app.use('/v1/availability', availabilityRoutes);
app.use('/v1/appointments', appointmentsRoutes);
app.use('/v1/consultations', consultationsRoutes);
app.use('/v1/blog', blogRoutes);

// Admin routes
app.use('/v1/admin/appointments', adminAppointmentsRoutes);
app.use('/v1/admin/consultations', adminConsultationsRoutes);
app.use('/v1/admin/employees', adminEmployeesRoutes);
app.use('/v1/admin/services', adminServicesRoutes);
app.use('/v1/admin/blog', adminBlogRoutes);
app.use('/v1/admin/clients', adminClientsRoutes);

// Employee routes
app.use('/v1/employee/appointments', employeeAppointmentsRoutes);
app.use('/v1/employee/schedule', employeeScheduleRoutes);
app.use('/v1/employee/time-blocks', employeeTimeBlocksRoutes);
app.use('/v1/employee/profile', employeeProfileRoutes);

// Health check
app.get('/v1/health', (req, res) => res.json({ status: 'ok' }));

// 404
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 3002;

if (require.main === module) {
  app.listen(PORT, () => console.log(`API running on port ${PORT}`));
}

module.exports = app;
```

- [ ] **Step 2: Criar src/middleware/rateLimit.js**

```javascript
const rateLimit = require('express-rate-limit');

const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 50,
  message: { error: 'Too many requests, please try again later.' },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'Too many login attempts, please try again later.' },
});

module.exports = { publicLimiter, authLimiter };
```

- [ ] **Step 3: Criar ficheiros de rota vazios** (para não dar erro no require)

```bash
cd backend/src
mkdir -p routes/admin routes/employee

# Criar ficheiro de rota vazio para cada módulo
for f in routes/auth.js routes/employees.js routes/services.js routes/availability.js routes/appointments.js routes/consultations.js routes/blog.js routes/admin/appointments.js routes/admin/consultations.js routes/admin/employees.js routes/admin/services.js routes/admin/blog.js routes/admin/clients.js routes/employee/appointments.js routes/employee/schedule.js routes/employee/timeBlocks.js routes/employee/profile.js; do
  echo "const router = require('express').Router(); module.exports = router;" > $f
done
```

- [ ] **Step 4: Testar que o servidor arranca**

```bash
cd backend
node src/index.js
```

Expected: `API running on port 3002`. Ctrl+C para parar.

- [ ] **Step 5: Commit**

```bash
git add src/
git commit -m "feat: add express app skeleton with all routes mounted"
```

---

## Task 4: Autenticação (JWT)

**Files:**
- Create: `backend/src/middleware/auth.js`
- Modify: `backend/src/routes/auth.js`
- Create: `backend/tests/auth.test.js`
- Create: `backend/tests/setup.js`

- [ ] **Step 1: Criar tests/setup.js**

```javascript
const prisma = require('../src/config/database');

// Usar test database
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret';

afterAll(async () => {
  await prisma.$disconnect();
});
```

- [ ] **Step 2: Escrever o teste de auth (failing)**

Criar `backend/tests/auth.test.js`:

```javascript
const request = require('supertest');
const app = require('../src/index');
const prisma = require('../src/config/database');
const bcrypt = require('bcryptjs');

describe('POST /v1/auth/login', () => {
  let adminUser;

  beforeAll(async () => {
    await prisma.user.deleteMany({ where: { email: 'admin@test.com' } });
    adminUser = await prisma.user.create({
      data: {
        name: 'Admin Test',
        email: 'admin@test.com',
        password: await bcrypt.hash('password123', 10),
        role: 'admin',
      },
    });
  });

  afterAll(async () => {
    await prisma.user.delete({ where: { id: adminUser.id } });
  });

  it('returns 200 and token with valid credentials', async () => {
    const res = await request(app)
      .post('/v1/auth/login')
      .send({ email: 'admin@test.com', password: 'password123' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe('admin@test.com');
    expect(res.body.user.role).toBe('admin');
    expect(res.body.user).not.toHaveProperty('password');
  });

  it('returns 401 with wrong password', async () => {
    const res = await request(app)
      .post('/v1/auth/login')
      .send({ email: 'admin@test.com', password: 'wrong' });

    expect(res.status).toBe(401);
  });

  it('returns 401 with unknown email', async () => {
    const res = await request(app)
      .post('/v1/auth/login')
      .send({ email: 'nobody@test.com', password: 'password123' });

    expect(res.status).toBe(401);
  });
});

describe('GET /v1/auth/me', () => {
  let token;
  let user;

  beforeAll(async () => {
    await prisma.user.deleteMany({ where: { email: 'me@test.com' } });
    user = await prisma.user.create({
      data: {
        name: 'Me Test',
        email: 'me@test.com',
        password: await bcrypt.hash('password123', 10),
        role: 'employee',
      },
    });
    const res = await request(app)
      .post('/v1/auth/login')
      .send({ email: 'me@test.com', password: 'password123' });
    token = res.body.token;
  });

  afterAll(async () => {
    await prisma.user.delete({ where: { id: user.id } });
  });

  it('returns user data with valid token', async () => {
    const res = await request(app)
      .get('/v1/auth/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.email).toBe('me@test.com');
  });

  it('returns 401 without token', async () => {
    const res = await request(app).get('/v1/auth/me');
    expect(res.status).toBe(401);
  });
});
```

- [ ] **Step 3: Correr o teste para confirmar que falha**

```bash
cd backend
npx jest tests/auth.test.js --runInBand
```

Expected: FAIL — routes not implemented yet.

- [ ] **Step 4: Criar src/middleware/auth.js**

```javascript
const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

function requireAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}

function requireEmployee(req, res, next) {
  if (!['admin', 'employee'].includes(req.user.role)) {
    return res.status(403).json({ error: 'Employee access required' });
  }
  next();
}

module.exports = { authenticate, requireAdmin, requireEmployee };
```

- [ ] **Step 5: Implementar src/routes/auth.js**

```javascript
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/database');
const { authenticate } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimit');

router.post('/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    const { password: _, ...userWithoutPassword } = user;

    res.json({ token, user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/logout', authenticate, (req, res) => {
  // JWT é stateless — o logout é feito pelo cliente apagando o token
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
```

- [ ] **Step 6: Correr o teste para confirmar que passa**

```bash
cd backend
npx jest tests/auth.test.js --runInBand
```

Expected: PASS — 5 tests passing.

- [ ] **Step 7: Commit**

```bash
git add src/middleware/auth.js src/routes/auth.js tests/
git commit -m "feat: add JWT authentication (login, me, logout)"
```

---

## Task 5: Funcionários e serviços (rotas públicas)

**Files:**
- Modify: `backend/src/routes/employees.js`
- Modify: `backend/src/routes/services.js`
- Create: `backend/tests/employees.test.js`
- Create: `backend/tests/services.test.js`

- [ ] **Step 1: Escrever tests/employees.test.js (failing)**

```javascript
const request = require('supertest');
const app = require('../src/index');
const prisma = require('../src/config/database');
const bcrypt = require('bcryptjs');

describe('GET /v1/employees', () => {
  let employee;

  beforeAll(async () => {
    await prisma.user.deleteMany({ where: { email: 'emp1@test.com' } });
    const user = await prisma.user.create({
      data: {
        name: 'João Barbeiro',
        email: 'emp1@test.com',
        password: await bcrypt.hash('pass123', 10),
        role: 'employee',
        employee: {
          create: {
            name: 'João Barbeiro',
            bio: 'Especialista em cortes',
            isActive: true,
          },
        },
      },
      include: { employee: true },
    });
    employee = user.employee;
  });

  afterAll(async () => {
    if (employee) {
      await prisma.employee.delete({ where: { id: employee.id } });
    }
    await prisma.user.deleteMany({ where: { email: 'emp1@test.com' } });
  });

  it('returns list of active employees', async () => {
    const res = await request(app).get('/v1/employees');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    const found = res.body.find(e => e.id === employee.id);
    expect(found).toBeDefined();
    expect(found.name).toBe('João Barbeiro');
  });

  it('GET /v1/employees/:id returns employee with services', async () => {
    const res = await request(app).get(`/v1/employees/${employee.id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(employee.id);
    expect(res.body).toHaveProperty('services');
    expect(res.body).toHaveProperty('workSchedules');
  });

  it('GET /v1/employees/:id returns 404 for unknown id', async () => {
    const res = await request(app).get('/v1/employees/99999');
    expect(res.status).toBe(404);
  });
});
```

- [ ] **Step 2: Escrever tests/services.test.js (failing)**

```javascript
const request = require('supertest');
const app = require('../src/index');
const prisma = require('../src/config/database');

describe('GET /v1/services', () => {
  let service;

  beforeAll(async () => {
    service = await prisma.service.create({
      data: {
        name: 'Corte Degradê',
        category: 'barbershop',
        durationMin: 45,
        price: 15.00,
        isActive: true,
      },
    });
  });

  afterAll(async () => {
    await prisma.service.delete({ where: { id: service.id } });
  });

  it('returns all active services', async () => {
    const res = await request(app).get('/v1/services');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    const found = res.body.find(s => s.id === service.id);
    expect(found).toBeDefined();
    expect(Number(found.price)).toBe(15.00);
  });

  it('filters by category', async () => {
    const res = await request(app).get('/v1/services?category=barbershop');
    expect(res.status).toBe(200);
    res.body.forEach(s => expect(s.category).toBe('barbershop'));
  });
});
```

- [ ] **Step 3: Correr para confirmar falha**

```bash
npx jest tests/employees.test.js tests/services.test.js --runInBand
```

Expected: FAIL.

- [ ] **Step 4: Implementar src/routes/employees.js**

```javascript
const router = require('express').Router();
const prisma = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const employees = await prisma.employee.findMany({
      where: { isActive: true },
      include: {
        services: { include: { service: true } },
      },
      orderBy: { name: 'asc' },
    });

    const result = employees.map(emp => ({
      ...emp,
      services: emp.services.map(es => es.service),
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' });

    const employee = await prisma.employee.findUnique({
      where: { id },
      include: {
        services: { include: { service: true } },
        workSchedules: { where: { isActive: true } },
      },
    });

    if (!employee || !employee.isActive) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json({
      ...employee,
      services: employee.services.map(es => es.service),
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
```

- [ ] **Step 5: Implementar src/routes/services.js**

```javascript
const router = require('express').Router();
const prisma = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const where = { isActive: true };
    if (category) where.category = category;

    const services = await prisma.service.findMany({
      where,
      orderBy: [{ category: 'asc' }, { name: 'asc' }],
    });

    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
```

- [ ] **Step 6: Correr os testes**

```bash
npx jest tests/employees.test.js tests/services.test.js --runInBand
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/routes/employees.js src/routes/services.js tests/
git commit -m "feat: add public employee and service endpoints"
```

---

## Task 6: Serviço de Disponibilidade (availability)

Esta é a lógica mais complexa do projecto. Calcula slots livres para um funcionário num dia, respeitando horário de trabalho, bloqueios e marcações existentes.

**Files:**
- Create: `backend/src/services/availability.service.js`
- Modify: `backend/src/routes/availability.js`
- Create: `backend/tests/availability.test.js`

- [ ] **Step 1: Escrever tests/availability.test.js (failing)**

```javascript
const { getAvailableSlots } = require('../src/services/availability.service');

describe('getAvailableSlots', () => {
  // Terça-feira = 2
  // dayOfWeek: 0=Dom, 1=Seg, 2=Ter, ...

  const employee = {
    id: 1,
    workSchedules: [
      { dayOfWeek: 2, startTime: '09:00', endTime: '13:00', isActive: true },
    ],
    timeBlocks: [],
    appointments: [],
  };

  it('returns correct slots for a working day', () => {
    // Terça-feira: 2026-04-28
    const slots = getAvailableSlots(employee, '2026-04-28', 60);
    // 09:00, 10:00, 11:00, 12:00 → 4 slots de 60min entre 09:00 e 13:00
    expect(slots).toHaveLength(4);
    expect(slots[0]).toBe('09:00');
    expect(slots[3]).toBe('12:00');
  });

  it('returns empty array for a non-working day', () => {
    // Quarta-feira: 2026-04-29
    const slots = getAvailableSlots(employee, '2026-04-29', 60);
    expect(slots).toHaveLength(0);
  });

  it('excludes slots blocked by time blocks', () => {
    const emp = {
      ...employee,
      timeBlocks: [{
        startDatetime: new Date('2026-04-28T10:00:00Z'), // 11:00 Lisbon (UTC+1)
        endDatetime: new Date('2026-04-28T11:00:00Z'),   // 12:00 Lisbon
      }],
    };
    // Em Lisbon: bloqueia 11:00-12:00
    // Slots: 09:00, 10:00, 12:00 (11:00 bloqueado)
    const slots = getAvailableSlots(emp, '2026-04-28', 60);
    expect(slots).not.toContain('11:00');
    expect(slots).toContain('09:00');
    expect(slots).toContain('10:00');
    expect(slots).toContain('12:00');
  });

  it('excludes slots occupied by appointments', () => {
    const emp = {
      ...employee,
      appointments: [{
        startDatetime: new Date('2026-04-28T09:00:00Z'), // 10:00 Lisbon
        endDatetime: new Date('2026-04-28T10:00:00Z'),   // 11:00 Lisbon
        status: 'confirmed',
      }],
    };
    const slots = getAvailableSlots(emp, '2026-04-28', 60);
    expect(slots).not.toContain('10:00');
    expect(slots).toContain('09:00');
    expect(slots).toContain('11:00');
    expect(slots).toContain('12:00');
  });

  it('excludes cancelled appointments (treats as free)', () => {
    const emp = {
      ...employee,
      appointments: [{
        startDatetime: new Date('2026-04-28T09:00:00Z'),
        endDatetime: new Date('2026-04-28T10:00:00Z'),
        status: 'cancelled',
      }],
    };
    const slots = getAvailableSlots(emp, '2026-04-28', 60);
    // Cancelado → slot livre
    expect(slots).toContain('10:00');
  });
});
```

- [ ] **Step 2: Correr para confirmar falha**

```bash
npx jest tests/availability.test.js --runInBand
```

Expected: FAIL — `getAvailableSlots` not defined.

- [ ] **Step 3: Criar src/services/availability.service.js**

```javascript
const { toZonedTime, fromZonedTime, format } = require('date-fns-tz');
const { parseISO, addMinutes, isBefore, isAfter, isEqual } = require('date-fns');

const TIMEZONE = 'Europe/Lisbon';

/**
 * Converte "HH:mm" + date string "YYYY-MM-DD" → Date UTC
 * assumindo o timezone Europe/Lisbon
 */
function lisboaTimeToUTC(dateStr, timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const localDate = new Date(`${dateStr}T${timeStr}:00`);
  return fromZonedTime(localDate, TIMEZONE);
}

/**
 * Verifica se um slot [slotStart, slotEnd] se sobrepõe com [blockStart, blockEnd]
 */
function overlaps(slotStart, slotEnd, blockStart, blockEnd) {
  return isBefore(slotStart, blockEnd) && isAfter(slotEnd, blockStart);
}

/**
 * Retorna os slots livres em formato "HH:mm" (hora Lisbon)
 * @param {object} employee - com workSchedules, timeBlocks, appointments
 * @param {string} dateStr - "YYYY-MM-DD"
 * @param {number} durationMin - duração do serviço em minutos
 */
function getAvailableSlots(employee, dateStr, durationMin) {
  const date = parseISO(dateStr);
  const dayOfWeek = date.getDay(); // 0=Sun, 6=Sat

  // 1. Encontrar horário de trabalho para este dia da semana
  const schedule = employee.workSchedules.find(
    ws => ws.dayOfWeek === dayOfWeek && ws.isActive
  );
  if (!schedule) return [];

  // 2. Gerar todos os slots possíveis
  const slots = [];
  const workStart = lisboaTimeToUTC(dateStr, schedule.startTime);
  const workEnd = lisboaTimeToUTC(dateStr, schedule.endTime);

  let current = workStart;
  while (isBefore(current, workEnd)) {
    const slotEnd = addMinutes(current, durationMin);
    if (isAfter(slotEnd, workEnd)) break; // slot não cabe no horário

    // 3. Verificar se o slot está bloqueado
    const isBlockedByTimeBlock = employee.timeBlocks.some(tb =>
      overlaps(current, slotEnd, new Date(tb.startDatetime), new Date(tb.endDatetime))
    );

    // 4. Verificar se está ocupado por marcação confirmada
    const isBlockedByAppointment = employee.appointments.some(apt =>
      apt.status !== 'cancelled' &&
      overlaps(current, slotEnd, new Date(apt.startDatetime), new Date(apt.endDatetime))
    );

    if (!isBlockedByTimeBlock && !isBlockedByAppointment) {
      // Converter para hora Lisbon e formatar como "HH:mm"
      const lisboaTime = toZonedTime(current, TIMEZONE);
      slots.push(format(lisboaTime, 'HH:mm', { timeZone: TIMEZONE }));
    }

    current = addMinutes(current, durationMin);
  }

  return slots;
}

module.exports = { getAvailableSlots, lisboaTimeToUTC };
```

- [ ] **Step 4: Correr os testes**

```bash
npx jest tests/availability.test.js --runInBand
```

Expected: PASS — 5 tests passing.

- [ ] **Step 5: Implementar src/routes/availability.js**

```javascript
const router = require('express').Router();
const prisma = require('../config/database');
const { getAvailableSlots } = require('../services/availability.service');

router.get('/:employeeId', async (req, res) => {
  try {
    const employeeId = parseInt(req.params.employeeId);
    const { date, serviceId } = req.query;

    if (!date || !serviceId) {
      return res.status(400).json({ error: 'date and serviceId are required' });
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ error: 'date must be YYYY-MM-DD format' });
    }

    const service = await prisma.service.findUnique({
      where: { id: parseInt(serviceId) },
    });
    if (!service) return res.status(404).json({ error: 'Service not found' });

    // Verificar que o funcionário oferece este serviço
    const employeeService = await prisma.employeeService.findUnique({
      where: {
        employeeId_serviceId: {
          employeeId,
          serviceId: parseInt(serviceId),
        },
      },
    });
    if (!employeeService) {
      return res.status(400).json({ error: 'Employee does not offer this service' });
    }

    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
      include: {
        workSchedules: { where: { isActive: true } },
        timeBlocks: {
          where: {
            startDatetime: { gte: new Date(`${date}T00:00:00Z`) },
            endDatetime: { lte: new Date(`${date}T23:59:59Z`) },
          },
        },
        appointments: {
          where: {
            startDatetime: { gte: new Date(`${date}T00:00:00Z`) },
            endDatetime: { lte: new Date(`${date}T23:59:59Z`) },
          },
        },
      },
    });

    if (!employee || !employee.isActive) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const slots = getAvailableSlots(employee, date, service.durationMin);

    res.json({ date, employeeId, serviceId: service.id, slots });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
```

- [ ] **Step 6: Commit**

```bash
git add src/services/availability.service.js src/routes/availability.js tests/availability.test.js
git commit -m "feat: add availability service and slots endpoint"
```

---

## Task 7: Marcações públicas (create, view, cancel)

**Files:**
- Modify: `backend/src/routes/appointments.js`
- Create: `backend/tests/appointments.test.js`

- [ ] **Step 1: Escrever tests/appointments.test.js (failing)**

```javascript
const request = require('supertest');
const app = require('../src/index');
const prisma = require('../src/config/database');
const bcrypt = require('bcryptjs');

describe('Appointments (public)', () => {
  let employee, service, user;

  beforeAll(async () => {
    await prisma.user.deleteMany({ where: { email: 'apttest@test.com' } });
    user = await prisma.user.create({
      data: {
        name: 'Apt Employee',
        email: 'apttest@test.com',
        password: await bcrypt.hash('pass', 10),
        role: 'employee',
        employee: { create: { name: 'Apt Employee', isActive: true } },
      },
      include: { employee: true },
    });
    employee = user.employee;

    service = await prisma.service.create({
      data: { name: 'Test Cut', category: 'barbershop', durationMin: 30, price: 10 },
    });

    await prisma.employeeService.create({
      data: { employeeId: employee.id, serviceId: service.id },
    });

    await prisma.workSchedule.create({
      data: {
        employeeId: employee.id,
        dayOfWeek: 2, // Tuesday
        startTime: '09:00',
        endTime: '18:00',
        isActive: true,
      },
    });
  });

  afterAll(async () => {
    await prisma.appointment.deleteMany({ where: { employeeId: employee.id } });
    await prisma.employeeService.deleteMany({ where: { employeeId: employee.id } });
    await prisma.workSchedule.deleteMany({ where: { employeeId: employee.id } });
    await prisma.service.delete({ where: { id: service.id } });
    await prisma.employee.delete({ where: { id: employee.id } });
    await prisma.user.delete({ where: { id: user.id } });
  });

  describe('POST /v1/appointments', () => {
    it('creates an appointment and returns it', async () => {
      const res = await request(app)
        .post('/v1/appointments')
        .send({
          clientName: 'Pedro Cliente',
          clientEmail: 'pedro@test.com',
          clientPhone: '912345678',
          employeeId: employee.id,
          serviceId: service.id,
          date: '2026-04-28',
          time: '10:00',
          notes: 'Sem notas',
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.clientEmail).toBe('pedro@test.com');
      expect(res.body.status).toBe('confirmed');
      expect(res.body).toHaveProperty('cancelToken');
    });

    it('returns 400 when required fields are missing', async () => {
      const res = await request(app)
        .post('/v1/appointments')
        .send({ clientName: 'Só o nome' });
      expect(res.status).toBe(400);
    });
  });

  describe('GET /v1/appointments/:id', () => {
    let apt;
    beforeAll(async () => {
      apt = await prisma.appointment.create({
        data: {
          clientName: 'Fetch Test',
          clientEmail: 'fetch@test.com',
          clientPhone: '911111111',
          employeeId: employee.id,
          serviceId: service.id,
          startDatetime: new Date('2026-04-28T10:00:00Z'),
          endDatetime: new Date('2026-04-28T10:30:00Z'),
          status: 'confirmed',
          cancelToken: 'test-cancel-token',
        },
      });
    });
    afterAll(async () => {
      await prisma.appointment.delete({ where: { id: apt.id } });
    });

    it('returns appointment by id', async () => {
      const res = await request(app).get(`/v1/appointments/${apt.id}`);
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(apt.id);
    });

    it('returns 404 for unknown id', async () => {
      const res = await request(app).get('/v1/appointments/99999');
      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /v1/appointments/:id (cancel by token)', () => {
    let apt;
    beforeAll(async () => {
      apt = await prisma.appointment.create({
        data: {
          clientName: 'Cancel Test',
          clientEmail: 'cancel@test.com',
          clientPhone: '922222222',
          employeeId: employee.id,
          serviceId: service.id,
          startDatetime: new Date('2026-04-30T09:00:00Z'),
          endDatetime: new Date('2026-04-30T09:30:00Z'),
          status: 'confirmed',
          cancelToken: 'valid-cancel-token-123',
        },
      });
    });

    it('cancels appointment with valid token', async () => {
      const res = await request(app)
        .delete(`/v1/appointments/${apt.id}`)
        .send({ cancelToken: 'valid-cancel-token-123' });
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('cancelled');
    });

    it('returns 403 with invalid token', async () => {
      const res = await request(app)
        .delete(`/v1/appointments/${apt.id}`)
        .send({ cancelToken: 'wrong-token' });
      expect(res.status).toBe(403);
    });
  });
});
```

- [ ] **Step 2: Correr para confirmar falha**

```bash
npx jest tests/appointments.test.js --runInBand
```

Expected: FAIL.

- [ ] **Step 3: Implementar src/routes/appointments.js**

```javascript
const router = require('express').Router();
const prisma = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const { lisboaTimeToUTC } = require('../services/availability.service');
const { publicLimiter } = require('../middleware/rateLimit');
const { addMinutes } = require('date-fns');

router.post('/', publicLimiter, async (req, res) => {
  try {
    const { clientName, clientEmail, clientPhone, employeeId, serviceId, date, time, notes } = req.body;

    if (!clientName || !clientEmail || !clientPhone || !employeeId || !serviceId || !date || !time) {
      return res.status(400).json({ error: 'All fields are required: clientName, clientEmail, clientPhone, employeeId, serviceId, date, time' });
    }

    const service = await prisma.service.findUnique({ where: { id: parseInt(serviceId) } });
    if (!service) return res.status(404).json({ error: 'Service not found' });

    const employee = await prisma.employee.findUnique({ where: { id: parseInt(employeeId) } });
    if (!employee || !employee.isActive) return res.status(404).json({ error: 'Employee not found' });

    const startDatetime = lisboaTimeToUTC(date, time);
    const endDatetime = addMinutes(startDatetime, service.durationMin);

    // Verificar conflito com marcações existentes
    const conflict = await prisma.appointment.findFirst({
      where: {
        employeeId: parseInt(employeeId),
        status: { not: 'cancelled' },
        OR: [
          {
            startDatetime: { lt: endDatetime },
            endDatetime: { gt: startDatetime },
          },
        ],
      },
    });

    if (conflict) {
      return res.status(409).json({ error: 'Time slot is no longer available' });
    }

    const cancelToken = uuidv4();

    const appointment = await prisma.appointment.create({
      data: {
        clientName,
        clientEmail,
        clientPhone,
        employeeId: parseInt(employeeId),
        serviceId: parseInt(serviceId),
        startDatetime,
        endDatetime,
        status: 'confirmed',
        notes: notes || null,
        cancelToken,
      },
      include: { employee: true, service: true },
    });

    res.status(201).json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: { employee: true, service: true },
    });

    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });

    // Não expor cancelToken em GETs
    const { cancelToken, ...safeAppointment } = appointment;
    res.json(safeAppointment);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { cancelToken } = req.body;

    const appointment = await prisma.appointment.findUnique({ where: { id } });
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    if (appointment.cancelToken !== cancelToken) {
      return res.status(403).json({ error: 'Invalid cancel token' });
    }
    if (appointment.status === 'cancelled') {
      return res.status(400).json({ error: 'Appointment is already cancelled' });
    }

    const updated = await prisma.appointment.update({
      where: { id },
      data: { status: 'cancelled' },
    });

    const { cancelToken: _, ...safe } = updated;
    res.json(safe);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
```

- [ ] **Step 4: Correr os testes**

```bash
npx jest tests/appointments.test.js --runInBand
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/routes/appointments.js tests/appointments.test.js
git commit -m "feat: add public appointment endpoints (create, view, cancel)"
```

---

## Task 8: Pedidos de consulta públicos (tattoo/piercing)

**Files:**
- Modify: `backend/src/routes/consultations.js`
- Create: `backend/tests/consultations.test.js`

- [ ] **Step 1: Escrever tests/consultations.test.js (failing)**

```javascript
const request = require('supertest');
const app = require('../src/index');
const prisma = require('../src/config/database');

describe('Consultations (public)', () => {
  let service;

  beforeAll(async () => {
    service = await prisma.service.create({
      data: {
        name: 'Tattoo Pequena',
        category: 'tattoo',
        durationMin: 120,
        price: 80,
        requiresConsultation: true,
      },
    });
  });

  afterAll(async () => {
    await prisma.consultationRequest.deleteMany({ where: { serviceId: service.id } });
    await prisma.service.delete({ where: { id: service.id } });
  });

  it('POST /v1/consultations creates a consultation request', async () => {
    const res = await request(app)
      .post('/v1/consultations')
      .send({
        clientName: 'Ana Tatuagem',
        clientEmail: 'ana@test.com',
        clientPhone: '933333333',
        serviceId: service.id,
        description: 'Quero uma rosa no pulso',
      });

    expect(res.status).toBe(201);
    expect(res.body.status).toBe('pending');
    expect(res.body.clientEmail).toBe('ana@test.com');
  });

  it('POST /v1/consultations returns 400 when fields are missing', async () => {
    const res = await request(app)
      .post('/v1/consultations')
      .send({ clientName: 'Só nome' });
    expect(res.status).toBe(400);
  });

  it('GET /v1/consultations/:id returns consultation', async () => {
    const consultation = await prisma.consultationRequest.create({
      data: {
        clientName: 'Fetch Consult',
        clientEmail: 'fetchc@test.com',
        clientPhone: '944444444',
        serviceId: service.id,
        description: 'Teste',
        status: 'pending',
      },
    });

    const res = await request(app).get(`/v1/consultations/${consultation.id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(consultation.id);

    await prisma.consultationRequest.delete({ where: { id: consultation.id } });
  });
});
```

- [ ] **Step 2: Implementar src/routes/consultations.js**

```javascript
const router = require('express').Router();
const prisma = require('../config/database');
const { publicLimiter } = require('../middleware/rateLimit');

router.post('/', publicLimiter, async (req, res) => {
  try {
    const { clientName, clientEmail, clientPhone, serviceId, employeeId, description, referenceImages } = req.body;

    if (!clientName || !clientEmail || !clientPhone || !serviceId || !description) {
      return res.status(400).json({ error: 'Required: clientName, clientEmail, clientPhone, serviceId, description' });
    }

    const service = await prisma.service.findUnique({ where: { id: parseInt(serviceId) } });
    if (!service) return res.status(404).json({ error: 'Service not found' });

    const consultation = await prisma.consultationRequest.create({
      data: {
        clientName,
        clientEmail,
        clientPhone,
        serviceId: parseInt(serviceId),
        employeeId: employeeId ? parseInt(employeeId) : null,
        description,
        referenceImages: referenceImages || null,
        status: 'pending',
      },
      include: { service: true, employee: true },
    });

    res.status(201).json(consultation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const consultation = await prisma.consultationRequest.findUnique({
      where: { id },
      include: { service: true, employee: { select: { id: true, name: true } } },
    });
    if (!consultation) return res.status(404).json({ error: 'Consultation not found' });
    res.json(consultation);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
```

- [ ] **Step 3: Correr os testes**

```bash
npx jest tests/consultations.test.js --runInBand
```

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/routes/consultations.js tests/consultations.test.js
git commit -m "feat: add public consultation request endpoints"
```

---

## Task 9: Blog (rotas públicas)

**Files:**
- Modify: `backend/src/routes/blog.js`

- [ ] **Step 1: Implementar src/routes/blog.js**

```javascript
const router = require('express').Router();
const prisma = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImageUrl: true,
        publishedAt: true,
        seoTitle: true,
        seoDescription: true,
        author: { select: { name: true } },
      },
      orderBy: { publishedAt: 'desc' },
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const post = await prisma.blogPost.findFirst({
      where: { slug: req.params.slug, isPublished: true },
      include: { author: { select: { name: true } } },
    });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
```

- [ ] **Step 2: Commit**

```bash
git add src/routes/blog.js
git commit -m "feat: add public blog endpoints"
```

---

## Task 10: Rotas Admin — Marcações

**Files:**
- Modify: `backend/src/routes/admin/appointments.js`
- Create: `backend/tests/admin.test.js`

- [ ] **Step 1: Escrever tests/admin.test.js — secção appointments (failing)**

```javascript
const request = require('supertest');
const app = require('../src/index');
const prisma = require('../src/config/database');
const bcrypt = require('bcryptjs');

let adminToken;
let adminUser;
let employee;
let service;

beforeAll(async () => {
  await prisma.user.deleteMany({ where: { email: 'admin-route@test.com' } });
  adminUser = await prisma.user.create({
    data: {
      name: 'Admin Route',
      email: 'admin-route@test.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin',
    },
  });

  const loginRes = await request(app)
    .post('/v1/auth/login')
    .send({ email: 'admin-route@test.com', password: 'admin123' });
  adminToken = loginRes.body.token;

  await prisma.user.deleteMany({ where: { email: 'admin-emp@test.com' } });
  const empUser = await prisma.user.create({
    data: {
      name: 'Admin Emp',
      email: 'admin-emp@test.com',
      password: await bcrypt.hash('pass', 10),
      role: 'employee',
      employee: { create: { name: 'Admin Emp', isActive: true } },
    },
    include: { employee: true },
  });
  employee = empUser.employee;

  service = await prisma.service.create({
    data: { name: 'Admin Test Service', category: 'barbershop', durationMin: 30, price: 10 },
  });
});

afterAll(async () => {
  await prisma.appointment.deleteMany({ where: { employeeId: employee.id } });
  await prisma.service.delete({ where: { id: service.id } });
  await prisma.employee.delete({ where: { id: employee.id } });
  await prisma.user.deleteMany({ where: { email: { in: ['admin-route@test.com', 'admin-emp@test.com'] } } });
});

describe('GET /v1/admin/appointments', () => {
  it('returns 401 without token', async () => {
    const res = await request(app).get('/v1/admin/appointments');
    expect(res.status).toBe(401);
  });

  it('returns all appointments for admin', async () => {
    const res = await request(app)
      .get('/v1/admin/appointments')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('POST /v1/admin/appointments', () => {
  it('admin can create appointment manually', async () => {
    const res = await request(app)
      .post('/v1/admin/appointments')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        clientName: 'Manual Client',
        clientEmail: 'manual@test.com',
        clientPhone: '955555555',
        employeeId: employee.id,
        serviceId: service.id,
        date: '2026-05-05',
        time: '14:00',
      });
    expect(res.status).toBe(201);
    expect(res.body.clientName).toBe('Manual Client');
  });
});
```

- [ ] **Step 2: Implementar src/routes/admin/appointments.js**

```javascript
const router = require('express').Router();
const prisma = require('../../config/database');
const { authenticate, requireAdmin } = require('../../middleware/auth');
const { lisboaTimeToUTC } = require('../../services/availability.service');
const { addMinutes } = require('date-fns');
const { v4: uuidv4 } = require('uuid');

router.use(authenticate, requireAdmin);

router.get('/', async (req, res) => {
  try {
    const { date, employeeId, status } = req.query;
    const where = {};

    if (date) {
      where.startDatetime = {
        gte: new Date(`${date}T00:00:00Z`),
        lt: new Date(`${date}T23:59:59Z`),
      };
    }
    if (employeeId) where.employeeId = parseInt(employeeId);
    if (status) where.status = status;

    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        employee: { select: { id: true, name: true } },
        service: true,
      },
      orderBy: { startDatetime: 'asc' },
    });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { clientName, clientEmail, clientPhone, employeeId, serviceId, date, time, notes } = req.body;

    if (!clientName || !clientEmail || !clientPhone || !employeeId || !serviceId || !date || !time) {
      return res.status(400).json({ error: 'All fields required' });
    }

    const service = await prisma.service.findUnique({ where: { id: parseInt(serviceId) } });
    if (!service) return res.status(404).json({ error: 'Service not found' });

    const startDatetime = lisboaTimeToUTC(date, time);
    const endDatetime = addMinutes(startDatetime, service.durationMin);

    const appointment = await prisma.appointment.create({
      data: {
        clientName,
        clientEmail,
        clientPhone,
        employeeId: parseInt(employeeId),
        serviceId: parseInt(serviceId),
        startDatetime,
        endDatetime,
        status: 'confirmed',
        notes: notes || null,
        cancelToken: uuidv4(),
      },
      include: { employee: true, service: true },
    });

    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status, notes, date, time } = req.body;

    const existing = await prisma.appointment.findUnique({
      where: { id },
      include: { service: true },
    });
    if (!existing) return res.status(404).json({ error: 'Appointment not found' });

    const updateData = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;
    if (date && time) {
      updateData.startDatetime = lisboaTimeToUTC(date, time);
      updateData.endDatetime = addMinutes(updateData.startDatetime, existing.service.durationMin);
    }

    const updated = await prisma.appointment.update({
      where: { id },
      data: updateData,
      include: { employee: true, service: true },
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
```

- [ ] **Step 3: Correr os testes**

```bash
npx jest tests/admin.test.js --runInBand
```

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/routes/admin/appointments.js tests/admin.test.js
git commit -m "feat: add admin appointment management endpoints"
```

---

## Task 11: Rotas Admin — Consultas, Funcionários, Serviços, Blog, Clientes

**Files:**
- Modify: `backend/src/routes/admin/consultations.js`
- Modify: `backend/src/routes/admin/employees.js`
- Modify: `backend/src/routes/admin/services.js`
- Modify: `backend/src/routes/admin/blog.js`
- Modify: `backend/src/routes/admin/clients.js`

- [ ] **Step 1: Implementar src/routes/admin/consultations.js**

```javascript
const router = require('express').Router();
const prisma = require('../../config/database');
const { authenticate, requireAdmin } = require('../../middleware/auth');
const { lisboaTimeToUTC } = require('../../services/availability.service');
const { addMinutes } = require('date-fns');
const { v4: uuidv4 } = require('uuid');

router.use(authenticate, requireAdmin);

router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    const consultations = await prisma.consultationRequest.findMany({
      where: status ? { status } : {},
      include: {
        service: true,
        employee: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(consultations);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status, employeeId, date, time } = req.body;

    const consultation = await prisma.consultationRequest.findUnique({
      where: { id },
      include: { service: true },
    });
    if (!consultation) return res.status(404).json({ error: 'Consultation not found' });

    const updateData = { status };
    if (employeeId) updateData.employeeId = parseInt(employeeId);

    // Se aprovado e agendado, criar marcação automaticamente
    if (status === 'scheduled' && date && time) {
      const service = consultation.service;
      const startDatetime = lisboaTimeToUTC(date, time);
      const endDatetime = addMinutes(startDatetime, service.durationMin);

      const appointment = await prisma.appointment.create({
        data: {
          clientName: consultation.clientName,
          clientEmail: consultation.clientEmail,
          clientPhone: consultation.clientPhone,
          employeeId: employeeId ? parseInt(employeeId) : consultation.employeeId,
          serviceId: consultation.serviceId,
          startDatetime,
          endDatetime,
          status: 'confirmed',
          cancelToken: uuidv4(),
        },
      });

      updateData.scheduledAppointmentId = appointment.id;
    }

    const updated = await prisma.consultationRequest.update({
      where: { id },
      data: updateData,
      include: { service: true, employee: true, scheduledAppointment: true },
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
```

- [ ] **Step 2: Implementar src/routes/admin/employees.js**

```javascript
const router = require('express').Router();
const prisma = require('../../config/database');
const bcrypt = require('bcryptjs');
const { authenticate, requireAdmin } = require('../../middleware/auth');

router.use(authenticate, requireAdmin);

router.get('/', async (req, res) => {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        user: { select: { id: true, email: true, role: true } },
        services: { include: { service: true } },
        workSchedules: { where: { isActive: true } },
      },
    });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, password, bio, role = 'employee', serviceIds } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'name, email, password required' });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ error: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role,
        employee: {
          create: {
            name,
            bio: bio || null,
            isActive: true,
          },
        },
      },
      include: { employee: true },
    });

    if (serviceIds && serviceIds.length > 0) {
      await prisma.employeeService.createMany({
        data: serviceIds.map(sid => ({
          employeeId: user.employee.id,
          serviceId: parseInt(sid),
        })),
        skipDuplicates: true,
      });
    }

    const { password: _, ...safeUser } = user;
    res.status(201).json(safeUser);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, bio, isActive, serviceIds } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (bio !== undefined) updateData.bio = bio;
    if (isActive !== undefined) updateData.isActive = isActive;

    const employee = await prisma.employee.update({
      where: { id },
      data: updateData,
    });

    if (serviceIds !== undefined) {
      await prisma.employeeService.deleteMany({ where: { employeeId: id } });
      if (serviceIds.length > 0) {
        await prisma.employeeService.createMany({
          data: serviceIds.map(sid => ({ employeeId: id, serviceId: parseInt(sid) })),
          skipDuplicates: true,
        });
      }
    }

    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
```

- [ ] **Step 3: Implementar src/routes/admin/services.js**

```javascript
const router = require('express').Router();
const prisma = require('../../config/database');
const { authenticate, requireAdmin } = require('../../middleware/auth');

router.use(authenticate, requireAdmin);

router.get('/', async (req, res) => {
  try {
    const services = await prisma.service.findMany({ orderBy: { category: 'asc' } });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, category, description, durationMin, price, requiresConsultation } = req.body;

    if (!name || !category || !durationMin || price === undefined) {
      return res.status(400).json({ error: 'name, category, durationMin, price required' });
    }

    const service = await prisma.service.create({
      data: {
        name,
        category,
        description: description || null,
        durationMin: parseInt(durationMin),
        price: parseFloat(price),
        requiresConsultation: requiresConsultation || false,
      },
    });

    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, category, description, durationMin, price, requiresConsultation, isActive } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (category !== undefined) updateData.category = category;
    if (description !== undefined) updateData.description = description;
    if (durationMin !== undefined) updateData.durationMin = parseInt(durationMin);
    if (price !== undefined) updateData.price = parseFloat(price);
    if (requiresConsultation !== undefined) updateData.requiresConsultation = requiresConsultation;
    if (isActive !== undefined) updateData.isActive = isActive;

    const service = await prisma.service.update({ where: { id }, data: updateData });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.service.update({ where: { id }, data: { isActive: false } });
    res.json({ message: 'Service deactivated' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
```

- [ ] **Step 4: Implementar src/routes/admin/blog.js**

```javascript
const router = require('express').Router();
const prisma = require('../../config/database');
const { authenticate, requireAdmin } = require('../../middleware/auth');

router.use(authenticate, requireAdmin);

function generateSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

router.get('/', async (req, res) => {
  try {
    const posts = await prisma.blogPost.findMany({
      include: { author: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, content, excerpt, coverImageUrl, seoTitle, seoDescription, isPublished } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'title and content required' });
    }

    const slug = generateSlug(title);

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || null,
        coverImageUrl: coverImageUrl || null,
        authorId: req.user.id,
        seoTitle: seoTitle || null,
        seoDescription: seoDescription || null,
        isPublished: isPublished || false,
        publishedAt: isPublished ? new Date() : null,
      },
    });

    res.status(201).json(post);
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(409).json({ error: 'A post with this title already exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, content, excerpt, coverImageUrl, seoTitle, seoDescription, isPublished } = req.body;

    const updateData = {};
    if (title !== undefined) { updateData.title = title; updateData.slug = generateSlug(title); }
    if (content !== undefined) updateData.content = content;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (coverImageUrl !== undefined) updateData.coverImageUrl = coverImageUrl;
    if (seoTitle !== undefined) updateData.seoTitle = seoTitle;
    if (seoDescription !== undefined) updateData.seoDescription = seoDescription;
    if (isPublished !== undefined) {
      updateData.isPublished = isPublished;
      if (isPublished) updateData.publishedAt = new Date();
    }

    const post = await prisma.blogPost.update({ where: { id }, data: updateData });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.blogPost.delete({ where: { id } });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
```

- [ ] **Step 5: Implementar src/routes/admin/clients.js**

```javascript
const router = require('express').Router();
const prisma = require('../../config/database');
const { authenticate, requireAdmin } = require('../../middleware/auth');

router.use(authenticate, requireAdmin);

router.get('/', async (req, res) => {
  try {
    const { email } = req.query;

    const appointments = await prisma.appointment.findMany({
      where: email ? { clientEmail: email } : {},
      include: {
        employee: { select: { id: true, name: true } },
        service: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    // Agrupar por email do cliente
    const clientMap = {};
    appointments.forEach(apt => {
      if (!clientMap[apt.clientEmail]) {
        clientMap[apt.clientEmail] = {
          email: apt.clientEmail,
          name: apt.clientName,
          phone: apt.clientPhone,
          appointments: [],
        };
      }
      clientMap[apt.clientEmail].appointments.push(apt);
    });

    res.json(Object.values(clientMap));
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
```

- [ ] **Step 6: Correr todos os testes**

```bash
npx jest --runInBand
```

Expected: PASS — todos os testes.

- [ ] **Step 7: Commit**

```bash
git add src/routes/admin/
git commit -m "feat: add all admin management endpoints"
```

---

## Task 12: Área do funcionário (horário, bloqueios, perfil, marcações)

**Files:**
- Modify: `backend/src/routes/employee/appointments.js`
- Modify: `backend/src/routes/employee/schedule.js`
- Modify: `backend/src/routes/employee/timeBlocks.js`
- Modify: `backend/src/routes/employee/profile.js`

- [ ] **Step 1: Implementar src/routes/employee/appointments.js**

```javascript
const router = require('express').Router();
const prisma = require('../../config/database');
const { authenticate, requireEmployee } = require('../../middleware/auth');

router.use(authenticate, requireEmployee);

async function getEmployeeFromUser(userId) {
  return prisma.employee.findUnique({ where: { userId } });
}

router.get('/', async (req, res) => {
  try {
    const employee = await getEmployeeFromUser(req.user.id);
    if (!employee) return res.status(404).json({ error: 'Employee profile not found' });

    const { date, status } = req.query;
    const where = { employeeId: employee.id };
    if (date) {
      where.startDatetime = {
        gte: new Date(`${date}T00:00:00Z`),
        lt: new Date(`${date}T23:59:59Z`),
      };
    }
    if (status) where.status = status;

    const appointments = await prisma.appointment.findMany({
      where,
      include: { service: true },
      orderBy: { startDatetime: 'asc' },
    });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const employee = await getEmployeeFromUser(req.user.id);
    if (!employee) return res.status(404).json({ error: 'Employee profile not found' });

    const id = parseInt(req.params.id);
    const appointment = await prisma.appointment.findUnique({ where: { id } });

    if (!appointment) return res.status(404).json({ error: 'Not found' });
    if (appointment.employeeId !== employee.id) return res.status(403).json({ error: 'Forbidden' });

    const { status } = req.body;
    // Funcionário só pode confirmar ou cancelar
    if (!['confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const updated = await prisma.appointment.update({
      where: { id },
      data: { status },
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
```

- [ ] **Step 2: Implementar src/routes/employee/schedule.js**

```javascript
const router = require('express').Router();
const prisma = require('../../config/database');
const { authenticate, requireEmployee } = require('../../middleware/auth');

router.use(authenticate, requireEmployee);

async function getEmployeeFromUser(userId) {
  return prisma.employee.findUnique({ where: { userId } });
}

router.get('/', async (req, res) => {
  try {
    const employee = await getEmployeeFromUser(req.user.id);
    if (!employee) return res.status(404).json({ error: 'Employee profile not found' });

    const schedules = await prisma.workSchedule.findMany({
      where: { employeeId: employee.id, isActive: true },
      orderBy: { dayOfWeek: 'asc' },
    });

    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Substituir todo o horário semanal
router.put('/', async (req, res) => {
  try {
    const employee = await getEmployeeFromUser(req.user.id);
    if (!employee) return res.status(404).json({ error: 'Employee profile not found' });

    const { schedules } = req.body;
    // schedules: [{ dayOfWeek: 1, startTime: "09:00", endTime: "18:00" }, ...]

    if (!Array.isArray(schedules)) {
      return res.status(400).json({ error: 'schedules must be an array' });
    }

    // Desactivar todos os horários existentes
    await prisma.workSchedule.updateMany({
      where: { employeeId: employee.id },
      data: { isActive: false },
    });

    // Criar os novos
    const created = await prisma.workSchedule.createMany({
      data: schedules.map(s => ({
        employeeId: employee.id,
        dayOfWeek: s.dayOfWeek,
        startTime: s.startTime,
        endTime: s.endTime,
        isActive: true,
      })),
    });

    const newSchedules = await prisma.workSchedule.findMany({
      where: { employeeId: employee.id, isActive: true },
      orderBy: { dayOfWeek: 'asc' },
    });

    res.json(newSchedules);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
```

- [ ] **Step 3: Implementar src/routes/employee/timeBlocks.js**

```javascript
const router = require('express').Router();
const prisma = require('../../config/database');
const { authenticate, requireEmployee } = require('../../middleware/auth');
const { fromZonedTime } = require('date-fns-tz');

router.use(authenticate, requireEmployee);

const TIMEZONE = 'Europe/Lisbon';

async function getEmployeeFromUser(userId) {
  return prisma.employee.findUnique({ where: { userId } });
}

router.get('/', async (req, res) => {
  try {
    const employee = await getEmployeeFromUser(req.user.id);
    if (!employee) return res.status(404).json({ error: 'Employee profile not found' });

    const blocks = await prisma.timeBlock.findMany({
      where: {
        employeeId: employee.id,
        endDatetime: { gte: new Date() }, // só futuros
      },
      orderBy: { startDatetime: 'asc' },
    });

    res.json(blocks);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const employee = await getEmployeeFromUser(req.user.id);
    if (!employee) return res.status(404).json({ error: 'Employee profile not found' });

    const { type, reason, startDate, startTime, endDate, endTime } = req.body;

    if (!type || !startDate || !endDate) {
      return res.status(400).json({ error: 'type, startDate, endDate required' });
    }

    // Para férias: bloquear dia inteiro
    // Para pausa/custom: precisa de hora
    let startDatetime, endDatetime;

    if (type === 'vacation') {
      startDatetime = fromZonedTime(new Date(`${startDate}T00:00:00`), TIMEZONE);
      endDatetime = fromZonedTime(new Date(`${endDate}T23:59:59`), TIMEZONE);
    } else {
      if (!startTime || !endTime) {
        return res.status(400).json({ error: 'startTime and endTime required for break/custom blocks' });
      }
      startDatetime = fromZonedTime(new Date(`${startDate}T${startTime}:00`), TIMEZONE);
      endDatetime = fromZonedTime(new Date(`${endDate}T${endTime}:00`), TIMEZONE);
    }

    const block = await prisma.timeBlock.create({
      data: {
        employeeId: employee.id,
        startDatetime,
        endDatetime,
        type,
        reason: reason || null,
      },
    });

    res.status(201).json(block);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const employee = await getEmployeeFromUser(req.user.id);
    if (!employee) return res.status(404).json({ error: 'Employee profile not found' });

    const id = parseInt(req.params.id);
    const block = await prisma.timeBlock.findUnique({ where: { id } });

    if (!block) return res.status(404).json({ error: 'Time block not found' });
    if (block.employeeId !== employee.id) return res.status(403).json({ error: 'Forbidden' });

    await prisma.timeBlock.delete({ where: { id } });
    res.json({ message: 'Time block deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
```

- [ ] **Step 4: Implementar src/routes/employee/profile.js**

```javascript
const router = require('express').Router();
const prisma = require('../../config/database');
const bcrypt = require('bcryptjs');
const { authenticate, requireEmployee } = require('../../middleware/auth');

router.use(authenticate, requireEmployee);

router.get('/', async (req, res) => {
  try {
    const employee = await prisma.employee.findUnique({
      where: { userId: req.user.id },
      include: {
        user: { select: { id: true, name: true, email: true, role: true } },
        services: { include: { service: true } },
      },
    });
    if (!employee) return res.status(404).json({ error: 'Employee profile not found' });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/', async (req, res) => {
  try {
    const { name, bio, photoUrl, currentPassword, newPassword } = req.body;

    const employee = await prisma.employee.findUnique({ where: { userId: req.user.id } });
    if (!employee) return res.status(404).json({ error: 'Employee profile not found' });

    // Actualizar dados do employee
    const empUpdate = {};
    if (name !== undefined) empUpdate.name = name;
    if (bio !== undefined) empUpdate.bio = bio;
    if (photoUrl !== undefined) empUpdate.photoUrl = photoUrl;

    if (Object.keys(empUpdate).length > 0) {
      await prisma.employee.update({ where: { id: employee.id }, data: empUpdate });
    }

    // Alterar password se pedido
    if (newPassword) {
      if (!currentPassword) return res.status(400).json({ error: 'currentPassword required' });

      const user = await prisma.user.findUnique({ where: { id: req.user.id } });
      const valid = await bcrypt.compare(currentPassword, user.password);
      if (!valid) return res.status(401).json({ error: 'Current password is incorrect' });

      const hashed = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({ where: { id: req.user.id }, data: { password: hashed } });
    }

    const updated = await prisma.employee.findUnique({
      where: { id: employee.id },
      include: { user: { select: { id: true, name: true, email: true, role: true } } },
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
```

- [ ] **Step 5: Correr todos os testes**

```bash
npx jest --runInBand
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/routes/employee/
git commit -m "feat: add employee area endpoints (schedule, time blocks, profile, appointments)"
```

---

## Task 13: Seed inicial (dados de exemplo)

**Files:**
- Create: `backend/prisma/seed.js`

- [ ] **Step 1: Criar prisma/seed.js**

```javascript
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Admin
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ganeshaink.pt' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@ganeshaink.pt',
      password: adminPassword,
      role: 'admin',
    },
  });
  console.log('Admin created:', admin.email);

  // Barbeiro
  const barbPass = await bcrypt.hash('barb123', 10);
  const barbUser = await prisma.user.upsert({
    where: { email: 'joao@ganeshaink.pt' },
    update: {},
    create: {
      name: 'João Silva',
      email: 'joao@ganeshaink.pt',
      password: barbPass,
      role: 'employee',
      employee: {
        create: {
          name: 'João Silva',
          bio: 'Especialista em cortes modernos e degradê com 5 anos de experiência.',
          isActive: true,
        },
      },
    },
    include: { employee: true },
  });
  console.log('Employee created:', barbUser.email);

  // Serviços de barbearia
  const corteSimples = await prisma.service.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Corte Simples',
      category: 'barbershop',
      description: 'Corte de cabelo clássico.',
      durationMin: 30,
      price: 12.00,
    },
  });

  const corteDegree = await prisma.service.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Corte Degradê',
      category: 'barbershop',
      description: 'Corte moderno em degradê.',
      durationMin: 45,
      price: 15.00,
    },
  });

  const barba = await prisma.service.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'Barba',
      category: 'barbershop',
      description: 'Aparar e modelar a barba.',
      durationMin: 20,
      price: 8.00,
    },
  });

  const tattooSmall = await prisma.service.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: 'Tatuagem Pequena',
      category: 'tattoo',
      description: 'Tatuagem até 5cm.',
      durationMin: 90,
      price: 60.00,
      requiresConsultation: true,
    },
  });

  // Associar serviços ao barbeiro
  const empId = barbUser.employee.id;
  await prisma.employeeService.createMany({
    data: [
      { employeeId: empId, serviceId: corteSimples.id },
      { employeeId: empId, serviceId: corteDegree.id },
      { employeeId: empId, serviceId: barba.id },
    ],
    skipDuplicates: true,
  });

  // Horário semanal: Seg-Sex 09:00-18:00
  await prisma.workSchedule.deleteMany({ where: { employeeId: empId } });
  await prisma.workSchedule.createMany({
    data: [1, 2, 3, 4, 5].map(day => ({
      employeeId: empId,
      dayOfWeek: day,
      startTime: '09:00',
      endTime: '18:00',
      isActive: true,
    })),
  });

  console.log('Seed complete!');
  console.log('Admin login: admin@ganeshaink.pt / admin123');
  console.log('Employee login: joao@ganeshaink.pt / barb123');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

- [ ] **Step 2: Adicionar seed script ao package.json**

No `backend/package.json`, dentro de `"scripts"`:
```json
"prisma:seed": "node prisma/seed.js"
```

- [ ] **Step 3: Correr o seed**

```bash
cd backend
npm run prisma:seed
```

Expected:
```
Seeding database...
Admin created: admin@ganeshaink.pt
Employee created: joao@ganeshaink.pt
Seed complete!
Admin login: admin@ganeshaink.pt / admin123
Employee login: joao@ganeshaink.pt / barb123
```

- [ ] **Step 4: Commit**

```bash
git add prisma/seed.js package.json
git commit -m "feat: add database seed with initial data"
```

---

## Task 14: Verificação end-to-end manual

- [ ] **Step 1: Arrancar o servidor**

```bash
cd backend
npm run dev
```

- [ ] **Step 2: Testar login como admin**

```bash
curl -X POST http://localhost:3002/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ganeshaink.pt","password":"admin123"}'
```

Expected: JSON com `token` e `user.role: "admin"`.

- [ ] **Step 3: Testar listagem de serviços**

```bash
curl http://localhost:3002/v1/services
```

Expected: array com os serviços criados no seed.

- [ ] **Step 4: Testar disponibilidade (substituir {employeeId} pelo id real)**

```bash
curl "http://localhost:3002/v1/availability/{employeeId}?date=2026-04-28&serviceId=1"
```

Expected: `{"date":"2026-04-28","slots":["09:00","09:30","10:00",...]}`.

- [ ] **Step 5: Criar uma marcação**

```bash
curl -X POST http://localhost:3002/v1/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "clientName": "Test Cliente",
    "clientEmail": "test@test.com",
    "clientPhone": "912345678",
    "employeeId": 1,
    "serviceId": 1,
    "date": "2026-04-28",
    "time": "10:00"
  }'
```

Expected: marcação criada com status `confirmed`.

- [ ] **Step 6: Correr suite completa de testes**

```bash
npx jest --runInBand --verbose
```

Expected: todos os testes PASS.

- [ ] **Step 7: Commit final**

```bash
git add -A
git commit -m "feat: complete backend API - all endpoints implemented and tested"
```

---

## Verificação Final

- [ ] `GET /v1/health` retorna `{"status":"ok"}`
- [ ] Login admin funciona e retorna JWT
- [ ] Login funcionário funciona e retorna JWT
- [ ] `GET /v1/employees` lista funcionários com serviços
- [ ] `GET /v1/services?category=barbershop` filtra correctamente
- [ ] `GET /v1/availability/:id?date=2026-04-28&serviceId=1` retorna slots livres
- [ ] `POST /v1/appointments` cria marcação e retorna `cancelToken`
- [ ] `DELETE /v1/appointments/:id` com token válido cancela marcação
- [ ] `POST /v1/consultations` cria pedido de consulta
- [ ] `GET /v1/admin/appointments` retorna 401 sem token
- [ ] `GET /v1/admin/appointments` retorna lista com token admin
- [ ] Admin consegue criar funcionário via `POST /v1/admin/employees`
- [ ] Funcionário consegue criar bloqueio de urgência via `POST /v1/employee/time-blocks`
- [ ] Slot bloqueado não aparece na disponibilidade
- [ ] Todos os testes Jest passam com `npx jest --runInBand`

---

## Próximo Plano

**Plano 2:** Frontend Público (ganeshaink.pt) — Next.js 14, App Router, homepage, wizard de marcação, blog SSR.
