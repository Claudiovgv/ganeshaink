# Barbearia Analysis Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Barbearia" page under the backoffice's "Análise" nav section showing revenue, material cost, and per-barber payout (%), plus placeholder "Tatuagens"/"Nails" pages and a settings page to configure each barber's material cost and payout %.

**Architecture:** New nullable `materialCost`/`payoutPercent` columns on the existing `Employee` model. A new `GET /v1/admin/stats/barbershop` route (added to the existing `backend/src/routes/admin/stats.js` router) aggregates barbershop-category appointments by employee and computes material cost / net revenue / payout using each employee's configured values. The backoffice gets three new pages (Barbearia, Tatuagens, Nails) plus a Definições sub-page (Contas Barbearia) that edits the two new employee fields through the existing `PUT /v1/admin/employees/:id` route.

**Tech Stack:** Express + Prisma (MySQL) backend, Next.js App Router backoffice, Jest + Supertest for backend tests.

## Global Constraints

- Revenue counts an appointment when `status = 'completed'` OR (`status = 'confirmed'` AND `endDatetime` is in the past) — same rule as `backend/src/routes/admin/stats.js`'s existing `GET /` route. Do not diverge from this.
- Material cost and payout % live on `Employee`, not on a category or global `Setting` — confirmed "per barbeiro" in the design spec.
- Only the Barbearia page is functional in this plan. Tatuagens/Nails are static "Em breve" pages with no data.
- No new npm dependencies.
- Money values are `Decimal` in the DB, plain `number` over the JSON API (mirror the existing `price` field's `Number(...)` conversion pattern already used in `stats.js` and `admin/appointments.js`).

---

### Task 1: Add `materialCost`/`payoutPercent` to the Employee model

**Files:**
- Modify: `backend/prisma/schema.prisma` (Employee model, around line 61-78)
- Create: `backend/prisma/migrations/20260815000000_barber_payout_config/migration.sql`

**Interfaces:**
- Produces: `Employee.materialCost: Decimal | null`, `Employee.payoutPercent: Decimal | null` — consumed by Task 2 (API), Task 3 (stats endpoint), Task 7 (settings page).

- [ ] **Step 1: Edit the schema**

In `backend/prisma/schema.prisma`, find the `Employee` model:

```prisma
model Employee {
  id            Int                   @id @default(autoincrement())
  userId        Int                   @unique @map("user_id")
  name          String
  bio           String?               @db.Text
  photoUrl      String?               @map("photo_url")
  isActive      Boolean               @default(true) @map("is_active")
  sortOrder     Int                   @default(0) @map("sort_order")
  createdAt     DateTime              @default(now()) @map("created_at")
```

Add two fields right after `photoUrl`:

```prisma
model Employee {
  id            Int                   @id @default(autoincrement())
  userId        Int                   @unique @map("user_id")
  name          String
  bio           String?               @db.Text
  photoUrl      String?               @map("photo_url")
  materialCost  Decimal?              @db.Decimal(6, 2) @map("material_cost")
  payoutPercent Decimal?              @db.Decimal(5, 2) @map("payout_percent")
  isActive      Boolean               @default(true) @map("is_active")
  sortOrder     Int                   @default(0) @map("sort_order")
  createdAt     DateTime              @default(now()) @map("created_at")
```

- [ ] **Step 2: Write the migration**

Create `backend/prisma/migrations/20260815000000_barber_payout_config/migration.sql`:

```sql
-- Configuração por funcionário usada na página Análise > Barbearia: custo de
-- material por marcação concluída, e % que o barbeiro recebe da receita
-- líquida (receita - material). NULL = ainda não configurado para essa pessoa.
ALTER TABLE `employees` ADD COLUMN `material_cost` DECIMAL(6, 2) NULL;
ALTER TABLE `employees` ADD COLUMN `payout_percent` DECIMAL(5, 2) NULL;
```

- [ ] **Step 3: Apply the migration and regenerate the client**

Run:
```bash
cd backend && node prisma/migrate.js && npx prisma generate
```
Expected: `Running: 20260815000000_barber_payout_config` then `✓ Done` then `All migrations applied! (1 new)`, followed by Prisma Client generation output with no errors.

- [ ] **Step 4: Apply the same migration to the test database**

Run:
```bash
cd backend && DATABASE_URL="$TEST_DATABASE_URL" node prisma/migrate.js
```
(`TEST_DATABASE_URL` is already defined in `backend/.env` — this mirrors how the `appointment_price_override` migration was applied to `ganeshaink_test` earlier in the project.)
Expected: same "1 new" migration output, this time against `ganeshaink_test`.

- [ ] **Step 5: Commit**

```bash
git add backend/prisma/schema.prisma backend/prisma/migrations/20260815000000_barber_payout_config
git commit -m "feat: add material cost and payout percent fields to Employee"
```

---

### Task 2: `PUT /v1/admin/employees/:id` accepts materialCost/payoutPercent

**Files:**
- Modify: `backend/src/routes/admin/employees.js:74-99`
- Test: `backend/tests/admin.test.js`

**Interfaces:**
- Consumes: `Employee.materialCost`, `Employee.payoutPercent` from Task 1.
- Produces: `PUT /v1/admin/employees/:id` accepts `{ materialCost?: string|number|null, payoutPercent?: string|number|null }` in the body alongside existing fields; response includes `materialCost`/`payoutPercent` on the returned employee (Prisma returns all scalar columns by default, no `select` restriction on this route, so no route change needed for the response shape). Consumed by Task 7 (settings page) and verified independently by Task 3's stats endpoint (reads the raw DB column directly, not through this route).

- [ ] **Step 1: Write the failing test**

In `backend/tests/admin.test.js`, add this new `describe` block right after the existing `describe('POST /v1/admin/employees', ...)` block (find it — it ends around line 199 with the closing `});` after the cleanup `await prisma.user.deleteMany(...)`):

```js
describe('PUT /v1/admin/employees/:id (config Barbearia)', () => {
  it('admin can set and clear materialCost and payoutPercent', async () => {
    const res = await request(app)
      .put(`/v1/admin/employees/${employee.id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ materialCost: '1.50', payoutPercent: '35' });
    expect(res.status).toBe(200);
    expect(Number(res.body.materialCost)).toBe(1.5);
    expect(Number(res.body.payoutPercent)).toBe(35);

    const cleared = await request(app)
      .put(`/v1/admin/employees/${employee.id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ materialCost: '', payoutPercent: '' });
    expect(cleared.status).toBe(200);
    expect(cleared.body.materialCost).toBeNull();
    expect(cleared.body.payoutPercent).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd backend && npx jest tests/admin.test.js -t "config Barbearia" --forceExit`
Expected: FAIL — `materialCost`/`payoutPercent` are stripped silently by the route (no error thrown, but `res.body.materialCost` is `undefined`, not `1.5`), so the `expect(Number(res.body.materialCost)).toBe(1.5)` assertion fails (`Number(undefined)` is `NaN`).

- [ ] **Step 3: Implement**

In `backend/src/routes/admin/employees.js`, update the `PUT /:id` handler:

```js
router.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, bio, isActive, serviceIds, materialCost, payoutPercent } = req.body;

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (bio !== undefined) updateData.bio = bio;
    if (isActive !== undefined) updateData.isActive = isActive;
    // Vazio/null limpa o valor (volta a "por configurar").
    if (materialCost !== undefined) updateData.materialCost = materialCost === '' || materialCost === null ? null : materialCost;
    if (payoutPercent !== undefined) updateData.payoutPercent = payoutPercent === '' || payoutPercent === null ? null : payoutPercent;

    const employee = await prisma.employee.update({ where: { id }, data: updateData });
```

(The rest of the handler — the `serviceIds` block and `res.json(employee)` — stays unchanged.)

- [ ] **Step 4: Run test to verify it passes**

Run: `cd backend && npx jest tests/admin.test.js -t "config Barbearia" --forceExit`
Expected: PASS.

- [ ] **Step 5: Run the full backend test suite**

Run: `cd backend && npm test`
Expected: all suites pass (56+ tests, no regressions).

- [ ] **Step 6: Commit**

```bash
git add backend/src/routes/admin/employees.js backend/tests/admin.test.js
git commit -m "feat: allow admin employee update to set material cost and payout percent"
```

---

### Task 3: `GET /v1/admin/stats/barbershop` endpoint

**Files:**
- Modify: `backend/src/routes/admin/stats.js`
- Test: `backend/tests/admin.test.js`

**Interfaces:**
- Consumes: `Employee.materialCost`, `Employee.payoutPercent` (Task 1); existing `getRange(period, offset)` helper and `TIMEZONE` const already defined at the top of `stats.js`; the `Category` model's `slug`/`parentId`/`children` relation (existing schema).
- Produces: `GET /v1/admin/stats/barbershop?period=week|month|year&offset=<int>` → `{ period, offset, range: { start, end }, barbers: [{ employeeId, name, count, revenue, materialCost, netRevenue, payoutPercent, payoutAmount, hasConfig }], totals: { count, revenue, materialCost, netRevenue, payoutAmount } }`. Consumed by Task 5 (frontend API client) and Task 8 (Barbearia page).

- [ ] **Step 1: Write the failing tests**

In `backend/tests/admin.test.js`, add this new `describe` block right after the existing `describe('Appointment price override affects stats revenue', ...)` block:

```js
describe('GET /v1/admin/stats/barbershop', () => {
  it('computes material cost and barber payout from configured employee values', async () => {
    const category = await ensureCategory('barbershop', 'Barbearia');
    const barberUser = await prisma.user.create({
      data: {
        name: 'Barbershop Stats Test', email: 'barbershop-stats-test@test.com', password: await bcrypt.hash('pass123', 10), role: 'employee',
        employee: { create: { name: 'Barbershop Stats Test', isActive: true, materialCost: '1.00', payoutPercent: '30' } },
      },
      include: { employee: true },
    });
    const barber = barberUser.employee;
    const svc = await prisma.service.create({ data: { name: 'Barbershop Stats Svc', categoryId: category.id, durationMin: 30, price: 20 } });

    const now = new Date();
    const apt1 = await prisma.appointment.create({
      data: { clientName: 'BS Test 1', clientEmail: 'bs1@test.com', clientPhone: '911111111', employeeId: barber.id, serviceId: svc.id, startDatetime: now, endDatetime: new Date(now.getTime() + 30 * 60000), status: 'completed', cancelToken: 'bs-token-1' },
    });
    const apt2 = await prisma.appointment.create({
      data: { clientName: 'BS Test 2', clientEmail: 'bs2@test.com', clientPhone: '922222222', employeeId: barber.id, serviceId: svc.id, startDatetime: new Date(now.getTime() + 60000), endDatetime: new Date(now.getTime() + 30 * 60000 + 60000), status: 'completed', cancelToken: 'bs-token-2' },
    });

    const res = await request(app)
      .get('/v1/admin/stats/barbershop')
      .set('Authorization', `Bearer ${adminToken}`)
      .query({ period: 'month', offset: '0' });

    expect(res.status).toBe(200);
    const entry = res.body.barbers.find((b) => b.employeeId === barber.id);
    expect(entry).toBeDefined();
    expect(entry.count).toBe(2);
    expect(entry.revenue).toBe(40);
    expect(entry.materialCost).toBe(2);
    expect(entry.netRevenue).toBe(38);
    expect(entry.payoutAmount).toBeCloseTo(11.4);
    expect(entry.hasConfig).toBe(true);

    await prisma.appointment.deleteMany({ where: { id: { in: [apt1.id, apt2.id] } } });
    await prisma.service.delete({ where: { id: svc.id } });
    await prisma.employee.delete({ where: { id: barber.id } });
    await prisma.user.delete({ where: { id: barberUser.id } });
  });

  it('marks a barber without configured material/percent as hasConfig=false and zero cost', async () => {
    const category = await ensureCategory('barbershop', 'Barbearia');
    const barberUser = await prisma.user.create({
      data: {
        name: 'Barbershop No Config Test', email: 'barbershop-noconfig-test@test.com', password: await bcrypt.hash('pass123', 10), role: 'employee',
        employee: { create: { name: 'Barbershop No Config Test', isActive: true } },
      },
      include: { employee: true },
    });
    const barber = barberUser.employee;
    const svc = await prisma.service.create({ data: { name: 'Barbershop No Config Svc', categoryId: category.id, durationMin: 30, price: 15 } });
    const now = new Date();
    const apt = await prisma.appointment.create({
      data: { clientName: 'BS NoConfig', clientEmail: 'bsnc@test.com', clientPhone: '933333333', employeeId: barber.id, serviceId: svc.id, startDatetime: now, endDatetime: new Date(now.getTime() + 30 * 60000), status: 'completed', cancelToken: 'bs-token-3' },
    });

    const res = await request(app)
      .get('/v1/admin/stats/barbershop')
      .set('Authorization', `Bearer ${adminToken}`)
      .query({ period: 'month', offset: '0' });

    expect(res.status).toBe(200);
    const entry = res.body.barbers.find((b) => b.employeeId === barber.id);
    expect(entry).toBeDefined();
    expect(entry.hasConfig).toBe(false);
    expect(entry.materialCost).toBe(0);
    expect(entry.payoutAmount).toBe(0);

    await prisma.appointment.delete({ where: { id: apt.id } });
    await prisma.service.delete({ where: { id: svc.id } });
    await prisma.employee.delete({ where: { id: barber.id } });
    await prisma.user.delete({ where: { id: barberUser.id } });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd backend && npx jest tests/admin.test.js -t "stats/barbershop" --forceExit`
Expected: FAIL with a 404 (route doesn't exist yet) — `res.status` is `404`, not `200`.

- [ ] **Step 3: Implement the route**

In `backend/src/routes/admin/stats.js`, add this new route right after the existing `router.get('/', ...)` handler (before `module.exports = router;`):

```js
// GET /v1/admin/stats/barbershop — receita, custo de material e valor a
// pagar por barbeiro. Usado pela página Análise > Barbearia.
router.get('/barbershop', async (req, res) => {
  try {
    const { period = 'month', offset = '0' } = req.query;
    if (!['week', 'month', 'year'].includes(period)) {
      return res.status(400).json({ error: 'period must be week, month or year' });
    }
    const { start, end } = getRange(period, offset);

    const barbershop = await prisma.category.findUnique({
      where: { slug: 'barbershop' },
      include: { children: { select: { id: true } } },
    });
    const emptyResponse = {
      period, offset: parseInt(offset, 10) || 0,
      range: { start: start.toISOString(), end: end.toISOString() },
      barbers: [],
      totals: { count: 0, revenue: 0, materialCost: 0, netRevenue: 0, payoutAmount: 0 },
    };
    if (!barbershop) return res.json(emptyResponse);

    const categoryIds = barbershop.children.length > 0 ? barbershop.children.map((c) => c.id) : [barbershop.id];

    const appointments = await prisma.appointment.findMany({
      where: {
        startDatetime: { gte: start, lte: end },
        service: { categoryId: { in: categoryIds } },
        OR: [
          { status: 'completed' },
          { status: 'confirmed', endDatetime: { lt: new Date() } },
        ],
      },
      include: {
        service: { select: { price: true } },
        employee: { select: { id: true, name: true, materialCost: true, payoutPercent: true } },
      },
    });

    const priceOf = (a) => Number(a.price ?? a.service.price);

    const byEmployee = {};
    for (const a of appointments) {
      const e = a.employee;
      if (!byEmployee[e.id]) {
        byEmployee[e.id] = {
          employeeId: e.id,
          name: e.name,
          count: 0,
          revenue: 0,
          materialCostPerUnit: e.materialCost !== null ? Number(e.materialCost) : null,
          payoutPercent: e.payoutPercent !== null ? Number(e.payoutPercent) : null,
        };
      }
      byEmployee[e.id].count += 1;
      byEmployee[e.id].revenue += priceOf(a);
    }

    const barbers = Object.values(byEmployee).map((b) => {
      const hasConfig = b.materialCostPerUnit !== null && b.payoutPercent !== null;
      const materialCost = b.count * (b.materialCostPerUnit ?? 0);
      const netRevenue = b.revenue - materialCost;
      const payoutAmount = netRevenue * ((b.payoutPercent ?? 0) / 100);
      return {
        employeeId: b.employeeId,
        name: b.name,
        count: b.count,
        revenue: b.revenue,
        materialCost,
        netRevenue,
        payoutPercent: b.payoutPercent,
        payoutAmount,
        hasConfig,
      };
    }).sort((a, b) => b.revenue - a.revenue);

    const totals = barbers.reduce((acc, b) => ({
      count: acc.count + b.count,
      revenue: acc.revenue + b.revenue,
      materialCost: acc.materialCost + b.materialCost,
      netRevenue: acc.netRevenue + b.netRevenue,
      payoutAmount: acc.payoutAmount + b.payoutAmount,
    }), { count: 0, revenue: 0, materialCost: 0, netRevenue: 0, payoutAmount: 0 });

    res.json({
      period, offset: parseInt(offset, 10) || 0,
      range: { start: start.toISOString(), end: end.toISOString() },
      barbers, totals,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd backend && npx jest tests/admin.test.js -t "stats/barbershop" --forceExit`
Expected: PASS (both new tests).

- [ ] **Step 5: Run the full backend test suite**

Run: `cd backend && npm test`
Expected: all suites pass, no regressions.

- [ ] **Step 6: Commit**

```bash
git add backend/src/routes/admin/stats.js backend/tests/admin.test.js
git commit -m "feat: add GET /admin/stats/barbershop endpoint for per-barber revenue and payout"
```

---

### Task 4: Frontend types for barber config and barbershop stats

**Files:**
- Modify: `backoffice/lib/types.ts`

**Interfaces:**
- Produces: `Employee.materialCost: number | null`, `Employee.payoutPercent: number | null`; new `BarberStats` and `BarbershopStatsResponse` types. Consumed by Task 5 (api.ts/actions.ts), Task 8 (Barbearia page), Task 9 (settings page).

- [ ] **Step 1: Add fields to `Employee`**

In `backoffice/lib/types.ts`, find:

```ts
export interface Employee {
  id: number;
  name: string;
  bio: string | null;
  photoUrl: string | null;
  isActive: boolean;
  user: { id: number; email: string; role: string };
  services: { service: Service }[];
}
```

Replace with:

```ts
export interface Employee {
  id: number;
  name: string;
  bio: string | null;
  photoUrl: string | null;
  materialCost: number | null;
  payoutPercent: number | null;
  isActive: boolean;
  user: { id: number; email: string; role: string };
  services: { service: Service }[];
}
```

- [ ] **Step 2: Add the barbershop stats types**

At the end of `backoffice/lib/types.ts`, after the existing `StatsResponse` interface, add:

```ts
export interface BarberStats {
  employeeId: number;
  name: string;
  count: number;
  revenue: number;
  materialCost: number;
  netRevenue: number;
  payoutPercent: number | null;
  payoutAmount: number;
  hasConfig: boolean;
}

export interface BarbershopStatsResponse {
  period: StatsPeriod;
  offset: number;
  range: { start: string; end: string };
  barbers: BarberStats[];
  totals: { count: number; revenue: number; materialCost: number; netRevenue: number; payoutAmount: number };
}
```

- [ ] **Step 3: Typecheck**

Run: `cd backoffice && npx tsc --noEmit`
Expected: no errors (nothing references these new fields/types yet, so this just confirms the file itself is syntactically valid).

- [ ] **Step 4: Commit**

```bash
git add backoffice/lib/types.ts
git commit -m "feat: add materialCost/payoutPercent and barbershop stats types"
```

---

### Task 5: Frontend API client and actions for barbershop stats

**Files:**
- Modify: `backoffice/lib/api.ts`
- Modify: `backoffice/lib/actions.ts`

**Interfaces:**
- Consumes: `BarbershopStatsResponse` (Task 4), `GET /v1/admin/stats/barbershop` (Task 3).
- Produces: `api.stats.getBarbershop(period, offset)`, `fetchBarbershopStatsAction(period, offset)`. Consumed by Task 8 (Barbearia page/client).

- [ ] **Step 1: Add the API method**

In `backoffice/lib/api.ts`, update the import line to include the new type:

```ts
import type {
  AdminPermissionKey, Appointment, BlogPost, BarbershopStatsResponse, Category, Client, ConfigurableRole, ConsultationRequest, CreateAppointmentResult,
  Employee, EmployeePermissionKey, EmployeeSchedules, Service, SmtpSettings, StatsPeriod, StatsResponse, SystemLogEntry,
  TimeBlock, TimeBlockConflict, TimeBlockInput, User, WeeklyScheduleDay,
} from './types';
```

Then find the `stats` section:

```ts
  stats: {
    get: (period: StatsPeriod, offset: number) =>
      apiFetch<StatsResponse>(`/admin/stats?period=${period}&offset=${offset}`),
  },
```

Replace with:

```ts
  stats: {
    get: (period: StatsPeriod, offset: number) =>
      apiFetch<StatsResponse>(`/admin/stats?period=${period}&offset=${offset}`),
    getBarbershop: (period: StatsPeriod, offset: number) =>
      apiFetch<BarbershopStatsResponse>(`/admin/stats/barbershop?period=${period}&offset=${offset}`),
  },
```

- [ ] **Step 2: Add the server action**

In `backoffice/lib/actions.ts`, find:

```ts
export async function fetchStatsAction(period: import('./types').StatsPeriod, offset: number) {
  return api.stats.get(period, offset);
}
```

Add right after it:

```ts
export async function fetchBarbershopStatsAction(period: import('./types').StatsPeriod, offset: number) {
  return api.stats.getBarbershop(period, offset);
}
```

- [ ] **Step 3: Typecheck**

Run: `cd backoffice && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add backoffice/lib/api.ts backoffice/lib/actions.ts
git commit -m "feat: add barbershop stats API client and server action"
```

---

### Task 6: Sidebar nav — Barbearia, Tatuagens, Nails links

**Files:**
- Modify: `backoffice/components/Sidebar.tsx`

**Interfaces:**
- Produces: sidebar links to `/barbearia`, `/tatuagens`, `/nails` for admin and superadmin roles. Consumed by Task 7 (placeholder pages) and Task 8 (Barbearia page) — those routes must exist for the links to resolve, but the link additions themselves don't depend on the pages existing yet (Next.js doesn't error on a `<Link>` to a not-yet-existing route at build time for this codebase's setup — the route only needs to exist by the time this task's manual verification step runs, which is after Task 8).

- [ ] **Step 1: Add the three new icons**

In `backoffice/components/Sidebar.tsx`, inside the `Icons` object, add these three entries right after the existing `Estatísticas` entry (around line 21):

```ts
  Barbearia: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
      <line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/>
    </svg>
  ),
  Tatuagens: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M12 2C12 2 5 10.5 5 15a7 7 0 0 0 14 0c0-4.5-7-13-7-13z"/>
    </svg>
  ),
  Nails: (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>
  ),
```

- [ ] **Step 2: Update `ADMIN_NAV_ALL`**

Find:

```ts
  { section: 'Análise', items: [{ href: '/estatisticas', label: 'Estatísticas', perm: 'view_stats' as AdminPermissionKey | null }] },
```

Replace with:

```ts
  {
    section: 'Análise',
    items: [
      { href: '/estatisticas', label: 'Estatísticas', perm: 'view_stats' as AdminPermissionKey | null },
      { href: '/barbearia', label: 'Barbearia', perm: 'view_stats' as AdminPermissionKey | null },
      { href: '/tatuagens', label: 'Tatuagens', perm: 'view_stats' as AdminPermissionKey | null },
      { href: '/nails', label: 'Nails', perm: 'view_stats' as AdminPermissionKey | null },
    ],
  },
```

- [ ] **Step 3: Update `SUPERADMIN_NAV`**

Find:

```ts
  { section: 'Análise', items: [{ href: '/estatisticas', label: 'Estatísticas' }] },
```

Replace with:

```ts
  {
    section: 'Análise',
    items: [
      { href: '/estatisticas', label: 'Estatísticas' },
      { href: '/barbearia', label: 'Barbearia' },
      { href: '/tatuagens', label: 'Tatuagens' },
      { href: '/nails', label: 'Nails' },
    ],
  },
```

- [ ] **Step 4: Add a settings entry for Contas Barbearia**

Find (in `ADMIN_NAV_ALL`):

```ts
  {
    section: 'Definições',
    items: [
      { href: '/definicoes/smtp', label: 'SMTP', perm: 'manage_settings' as AdminPermissionKey | null },
      { href: '/definicoes/tecnologia', label: 'Tecnologia', perm: 'manage_settings' as AdminPermissionKey | null },
    ],
  },
```

Replace with:

```ts
  {
    section: 'Definições',
    items: [
      { href: '/definicoes/smtp', label: 'SMTP', perm: 'manage_settings' as AdminPermissionKey | null },
      { href: '/definicoes/contas-barbearia', label: 'Contas Barbearia', perm: 'manage_settings' as AdminPermissionKey | null },
      { href: '/definicoes/tecnologia', label: 'Tecnologia', perm: 'manage_settings' as AdminPermissionKey | null },
    ],
  },
```

And in `SUPERADMIN_NAV`, find:

```ts
  {
    section: 'Definições',
    items: [
      { href: '/definicoes/smtp', label: 'SMTP' },
      { href: '/definicoes/tecnologia', label: 'Tecnologia' },
      { href: '/definicoes/logs', label: 'Log' },
    ],
  },
```

Replace with:

```ts
  {
    section: 'Definições',
    items: [
      { href: '/definicoes/smtp', label: 'SMTP' },
      { href: '/definicoes/contas-barbearia', label: 'Contas Barbearia' },
      { href: '/definicoes/tecnologia', label: 'Tecnologia' },
      { href: '/definicoes/logs', label: 'Log' },
    ],
  },
```

Note: the label used in the nav items (`'Contas Barbearia'`) must exactly match a key in `Icons` or `Icons[label]` renders `undefined` (no crash — `<span className="opacity-60">{undefined}</span>` just renders an empty icon slot). Add an icon for it too, in the same `Icons` object edit as Step 1:

```ts
  'Contas Barbearia': (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>
    </svg>
  ),
```

- [ ] **Step 5: Typecheck**

Run: `cd backoffice && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add backoffice/components/Sidebar.tsx
git commit -m "feat: add Barbearia/Tatuagens/Nails and Contas Barbearia to sidebar nav"
```

(The new links will 404 until Tasks 7-9 add the corresponding pages — that's expected at this point in the plan.)

---

### Task 7: Tatuagens and Nails placeholder pages

**Files:**
- Create: `backoffice/app/(dashboard)/tatuagens/page.tsx`
- Create: `backoffice/app/(dashboard)/nails/page.tsx`

**Interfaces:**
- Consumes: `api.auth.me()` (existing, same pattern as `estatisticas/page.tsx`).
- Produces: working `/tatuagens` and `/nails` routes (fixes the 404s left by Task 6).

- [ ] **Step 1: Create the Tatuagens page**

Create `backoffice/app/(dashboard)/tatuagens/page.tsx`:

```tsx
import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';

export const metadata = { title: 'Tatuagens' };

export default async function TatuagensPage() {
  const user = await api.auth.me().catch(() => null);
  const allowed = user && (user.role === 'superadmin' || (user.role === 'admin' && user.permissions?.view_stats));
  if (!allowed) {
    return (
      <div>
        <TopBar title="Tatuagens" />
        <div className="p-6 text-text-secondary">Não tens permissão para aceder a esta área.</div>
      </div>
    );
  }

  return (
    <div>
      <TopBar title="Tatuagens" />
      <div className="p-6">
        <div className="bg-bg-card border border-gold-border rounded-lg p-8 text-center">
          <p className="text-text-primary font-semibold mb-1">Em breve</p>
          <p className="text-text-secondary text-sm">Esta área ainda não está disponível.</p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create the Nails page**

Create `backoffice/app/(dashboard)/nails/page.tsx`:

```tsx
import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';

export const metadata = { title: 'Nails' };

export default async function NailsPage() {
  const user = await api.auth.me().catch(() => null);
  const allowed = user && (user.role === 'superadmin' || (user.role === 'admin' && user.permissions?.view_stats));
  if (!allowed) {
    return (
      <div>
        <TopBar title="Nails" />
        <div className="p-6 text-text-secondary">Não tens permissão para aceder a esta área.</div>
      </div>
    );
  }

  return (
    <div>
      <TopBar title="Nails" />
      <div className="p-6">
        <div className="bg-bg-card border border-gold-border rounded-lg p-8 text-center">
          <p className="text-text-primary font-semibold mb-1">Em breve</p>
          <p className="text-text-secondary text-sm">Esta área ainda não está disponível.</p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Typecheck**

Run: `cd backoffice && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add "backoffice/app/(dashboard)/tatuagens" "backoffice/app/(dashboard)/nails"
git commit -m "feat: add Tatuagens and Nails placeholder pages"
```

---

### Task 8: Barbearia page

**Files:**
- Create: `backoffice/app/(dashboard)/barbearia/page.tsx`
- Create: `backoffice/app/(dashboard)/barbearia/BarbeariaClient.tsx`

**Interfaces:**
- Consumes: `api.stats.getBarbershop` (Task 5), `fetchBarbershopStatsAction` (Task 5), `BarbershopStatsResponse`/`BarberStats` (Task 4).
- Produces: working `/barbearia` route with period selector, summary, and Material/% Barbeiro tabs.

- [ ] **Step 1: Create the page (server component)**

Create `backoffice/app/(dashboard)/barbearia/page.tsx`, mirroring `estatisticas/page.tsx`:

```tsx
import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import BarbeariaClient from './BarbeariaClient';

export const metadata = { title: 'Barbearia' };

export default async function BarbeariaPage() {
  const user = await api.auth.me().catch(() => null);
  const allowed = user && (user.role === 'superadmin' || (user.role === 'admin' && user.permissions?.view_stats));
  if (!allowed) {
    return (
      <div>
        <TopBar title="Barbearia" />
        <div className="p-6 text-text-secondary">Não tens permissão para aceder a esta área.</div>
      </div>
    );
  }

  const initial = await api.stats.getBarbershop('month', 0).catch(() => null);

  return (
    <div>
      <TopBar title="Barbearia" />
      <div className="p-6">
        {initial
          ? <BarbeariaClient initial={initial} />
          : <p className="text-text-secondary">Não foi possível carregar os dados da Barbearia.</p>
        }
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create the client component**

Create `backoffice/app/(dashboard)/barbearia/BarbeariaClient.tsx`:

```tsx
'use client';
import { useState, useTransition } from 'react';
import Link from 'next/link';
import type { StatsPeriod, BarbershopStatsResponse } from '@/lib/types';
import { fetchBarbershopStatsAction } from '@/lib/actions';
import { toLisbon, formatLisbon } from '@/lib/timezone';

const PERIOD_LABELS: Record<StatsPeriod, string> = { week: 'Semana', month: 'Mês', year: 'Ano' };

function money(n: number) {
  return `${n.toFixed(2)} €`;
}

function formatRange(period: StatsPeriod, range: { start: string; end: string }) {
  if (period === 'year') return toLisbon(range.start).getFullYear().toString();
  if (period === 'month') {
    const label = formatLisbon(range.start, 'MMMM yyyy');
    return label.charAt(0).toUpperCase() + label.slice(1);
  }
  return `${formatLisbon(range.start, 'dd/MM')} — ${formatLisbon(range.end, 'dd/MM')}`;
}

type Tab = 'material' | 'payout';

export default function BarbeariaClient({ initial }: { initial: BarbershopStatsResponse }) {
  const [data, setData] = useState(initial);
  const [period, setPeriod] = useState<StatsPeriod>(initial.period);
  const [offset, setOffset] = useState(initial.offset);
  const [tab, setTab] = useState<Tab>('material');
  const [isPending, startTransition] = useTransition();

  function load(nextPeriod: StatsPeriod, nextOffset: number) {
    startTransition(async () => {
      const result = await fetchBarbershopStatsAction(nextPeriod, nextOffset);
      setData(result);
      setPeriod(nextPeriod);
      setOffset(nextOffset);
    });
  }

  const missingConfig = data.barbers.filter((b) => !b.hasConfig);

  return (
    <div className="space-y-6">
      {/* Período */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {(['week', 'month', 'year'] as StatsPeriod[]).map((p) => (
            <button
              key={p}
              onClick={() => load(p, 0)}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                period === p ? 'bg-gold text-bg-primary' : 'border border-gold-border text-text-secondary hover:border-gold hover:text-gold'
              }`}
            >
              {PERIOD_LABELS[p]}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => load(period, offset - 1)}
            disabled={isPending}
            className="w-9 h-9 flex items-center justify-center border border-gold-border rounded text-text-secondary hover:border-gold hover:text-gold disabled:opacity-40"
          >
            ‹
          </button>
          <span className="text-sm text-text-primary font-medium min-w-[10rem] text-center">
            {formatRange(period, data.range)}
          </span>
          <button
            onClick={() => load(period, offset + 1)}
            disabled={isPending || offset >= 0}
            className="w-9 h-9 flex items-center justify-center border border-gold-border rounded text-text-secondary hover:border-gold hover:text-gold disabled:opacity-40"
          >
            ›
          </button>
          {offset !== 0 && (
            <button onClick={() => load(period, 0)} className="text-xs text-gold hover:underline">Hoje</button>
          )}
        </div>
      </div>

      <p className="text-text-muted text-xs -mt-2">Baseado em marcações concluídas (ou confirmadas já passadas) da Barbearia.</p>

      {/* Resumo */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-bg-card border border-gold-border rounded-lg p-4">
          <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Receita</p>
          <p className="text-2xl font-display font-bold text-gold">{money(data.totals.revenue)}</p>
        </div>
        <div className="bg-bg-card border border-gold-border rounded-lg p-4">
          <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Marcações</p>
          <p className="text-2xl font-display font-bold text-text-primary">{data.totals.count}</p>
        </div>
        <div className="bg-bg-card border border-gold-border rounded-lg p-4">
          <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Material</p>
          <p className="text-2xl font-display font-bold text-text-primary">{money(data.totals.materialCost)}</p>
        </div>
        <div className="bg-bg-card border border-gold-border rounded-lg p-4">
          <p className="text-text-muted text-xs uppercase tracking-wider mb-1">Total barbeiros</p>
          <p className="text-2xl font-display font-bold text-text-primary">{money(data.totals.payoutAmount)}</p>
        </div>
      </div>

      {missingConfig.length > 0 && (
        <p className="text-amber-400 text-sm bg-amber-500/10 border border-amber-500/30 rounded px-3 py-2">
          {missingConfig.map((b) => b.name).join(', ')} sem valor de material/% configurado —{' '}
          <Link href="/definicoes/contas-barbearia" className="underline">definir agora</Link>.
        </p>
      )}

      {/* Abas Material / % Barbeiro */}
      <div className="bg-bg-card border border-gold-border rounded-lg overflow-hidden">
        <div className="flex border-b border-gold-border/30">
          <button
            onClick={() => setTab('material')}
            className={`px-5 py-3 text-sm font-medium transition-colors ${
              tab === 'material' ? 'text-gold border-b-2 border-gold' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Material
          </button>
          <button
            onClick={() => setTab('payout')}
            className={`px-5 py-3 text-sm font-medium transition-colors ${
              tab === 'payout' ? 'text-gold border-b-2 border-gold' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            % Barbeiro
          </button>
        </div>

        {data.barbers.length === 0 ? (
          <p className="text-text-secondary text-sm p-5">Sem marcações da Barbearia neste período.</p>
        ) : tab === 'material' ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold-border/30 bg-bg-section">
                <th className="text-left px-5 py-2 text-text-secondary font-medium text-xs uppercase tracking-wider">Barbeiro</th>
                <th className="text-right px-5 py-2 text-text-secondary font-medium text-xs uppercase tracking-wider">Marcações</th>
                <th className="text-right px-5 py-2 text-text-secondary font-medium text-xs uppercase tracking-wider">Valor/marcação</th>
                <th className="text-right px-5 py-2 text-text-secondary font-medium text-xs uppercase tracking-wider">Total material</th>
              </tr>
            </thead>
            <tbody>
              {data.barbers.map((b) => (
                <tr key={b.employeeId} className="border-b border-gold-border/10 last:border-0">
                  <td className="px-5 py-2.5 text-text-primary">{b.name}</td>
                  <td className="px-5 py-2.5 text-text-secondary text-right">{b.count}</td>
                  <td className="px-5 py-2.5 text-text-secondary text-right">
                    {b.hasConfig ? money(b.materialCost / b.count) : '—'}
                  </td>
                  <td className="px-5 py-2.5 text-gold text-right font-medium">
                    {b.hasConfig ? money(b.materialCost) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold-border/30 bg-bg-section">
                <th className="text-left px-5 py-2 text-text-secondary font-medium text-xs uppercase tracking-wider">Barbeiro</th>
                <th className="text-right px-5 py-2 text-text-secondary font-medium text-xs uppercase tracking-wider">Receita líquida</th>
                <th className="text-right px-5 py-2 text-text-secondary font-medium text-xs uppercase tracking-wider">%</th>
                <th className="text-right px-5 py-2 text-text-secondary font-medium text-xs uppercase tracking-wider">Valor a pagar</th>
              </tr>
            </thead>
            <tbody>
              {data.barbers.map((b) => (
                <tr key={b.employeeId} className="border-b border-gold-border/10 last:border-0">
                  <td className="px-5 py-2.5 text-text-primary">{b.name}</td>
                  <td className="px-5 py-2.5 text-text-secondary text-right">{money(b.netRevenue)}</td>
                  <td className="px-5 py-2.5 text-text-secondary text-right">
                    {b.hasConfig ? `${b.payoutPercent}%` : '—'}
                  </td>
                  <td className="px-5 py-2.5 text-gold text-right font-medium">
                    {b.hasConfig ? money(b.payoutAmount) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Typecheck**

Run: `cd backoffice && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Manual verification in the browser**

Start the backend (`cd backend && npm run dev`) and backoffice (`cd backoffice && NEXT_PUBLIC_API_URL=http://localhost:3002/v1 npm run dev -- -p 3011`) locally. Log in as an admin/superadmin, navigate to `/barbearia`. Confirm:
- Period buttons (Semana/Mês/Ano) switch and reload data.
- Summary cards show numbers (or zeros if no barbershop appointments this month).
- "Material" and "% Barbeiro" tabs switch content.
- If Eduardo Gomes has no `materialCost`/`payoutPercent` set yet, the amber "sem valor... configurado" banner appears and links to `/definicoes/contas-barbearia`.

- [ ] **Step 5: Commit**

```bash
git add "backoffice/app/(dashboard)/barbearia"
git commit -m "feat: add Barbearia analysis page with material and payout tabs"
```

---

### Task 9: Contas Barbearia settings page

**Files:**
- Create: `backoffice/app/(dashboard)/definicoes/contas-barbearia/page.tsx`
- Create: `backoffice/app/(dashboard)/definicoes/contas-barbearia/ContasBarbeariaClient.tsx`

**Interfaces:**
- Consumes: `api.employees.list()`, `api.categories.adminList()` (existing), `updateEmployeeAction(id, data)` (existing, generic — `backoffice/lib/actions.ts`), `Employee` type (Task 4).
- Produces: working `/definicoes/contas-barbearia` route where an admin edits `materialCost`/`payoutPercent` per barber.

- [ ] **Step 1: Create the page (server component)**

Create `backoffice/app/(dashboard)/definicoes/contas-barbearia/page.tsx`:

```tsx
import { api } from '@/lib/api';
import TopBar from '@/components/TopBar';
import ContasBarbeariaClient from './ContasBarbeariaClient';

export const metadata = { title: 'Contas Barbearia — Definições' };

export default async function ContasBarbeariaPage() {
  const user = await api.auth.me().catch(() => null);
  const allowed = user && (user.role === 'superadmin' || (user.role === 'admin' && user.permissions?.manage_settings));
  if (!allowed) {
    return (
      <div>
        <TopBar title="Definições" />
        <div className="p-6 text-text-secondary">Não tens permissão para aceder a esta área.</div>
      </div>
    );
  }

  const [employees, categories] = await Promise.all([
    api.employees.list().catch(() => []),
    api.categories.adminList().catch(() => []),
  ]);

  const barbershop = categories.find((c) => c.slug === 'barbershop');
  const barbershopCategoryIds = new Set<number>(
    barbershop
      ? [barbershop.id, ...(barbershop.children ?? []).map((c) => c.id)]
      : []
  );
  const barbers = employees.filter(
    (e) => e.isActive && e.services.some((s) => barbershopCategoryIds.has(s.service.categoryId))
  );

  return (
    <div>
      <TopBar title="Contas Barbearia" />
      <div className="p-6 max-w-2xl">
        <p className="text-text-secondary text-sm mb-4">
          Valor de material por marcação e % da receita líquida que cada barbeiro recebe — usados na página Análise → Barbearia.
        </p>
        {barbers.length === 0
          ? <p className="text-text-secondary">Nenhum barbeiro ativo com serviços de Barbearia atribuídos.</p>
          : <ContasBarbeariaClient initial={barbers} />
        }
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create the client component**

Create `backoffice/app/(dashboard)/definicoes/contas-barbearia/ContasBarbeariaClient.tsx`:

```tsx
'use client';
import { useState, useTransition } from 'react';
import type { Employee } from '@/lib/types';
import Button from '@/components/Button';
import { updateEmployeeAction } from '@/lib/actions';

interface Row {
  employeeId: number;
  name: string;
  materialCost: string;
  payoutPercent: string;
}

export default function ContasBarbeariaClient({ initial }: { initial: Employee[] }) {
  const [rows, setRows] = useState<Row[]>(
    initial.map((e) => ({
      employeeId: e.id,
      name: e.name,
      materialCost: e.materialCost != null ? String(e.materialCost) : '',
      payoutPercent: e.payoutPercent != null ? String(e.payoutPercent) : '',
    }))
  );
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function updateRow(employeeId: number, field: 'materialCost' | 'payoutPercent', value: string) {
    setRows((prev) => prev.map((r) => (r.employeeId === employeeId ? { ...r, [field]: value } : r)));
  }

  function handleSave() {
    setError(null);
    setMessage(null);
    startTransition(async () => {
      try {
        await Promise.all(
          rows.map((r) =>
            updateEmployeeAction(r.employeeId, { materialCost: r.materialCost, payoutPercent: r.payoutPercent })
          )
        );
        setMessage('Valores guardados.');
      } catch (err) {
        setError((err as Error).message || 'Erro ao guardar. Tenta novamente.');
      }
    });
  }

  return (
    <div className="space-y-4">
      {error && <p className="text-red-400 text-sm">{error}</p>}
      {message && <p className="text-green-400 text-sm">{message}</p>}

      <div className="bg-bg-card border border-gold-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gold-border/30 bg-bg-section">
              <th className="text-left px-4 py-2 text-text-secondary font-medium text-xs uppercase tracking-wider">Barbeiro</th>
              <th className="text-left px-4 py-2 text-text-secondary font-medium text-xs uppercase tracking-wider">Valor material (€)</th>
              <th className="text-left px-4 py-2 text-text-secondary font-medium text-xs uppercase tracking-wider">% Barbeiro</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.employeeId} className="border-b border-gold-border/10 last:border-0">
                <td className="px-4 py-2.5 text-text-primary">{r.name}</td>
                <td className="px-4 py-2.5">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={r.materialCost}
                    onChange={(e) => updateRow(r.employeeId, 'materialCost', e.target.value)}
                    placeholder="1.00"
                    className="w-28 bg-bg-primary border border-gold-border rounded px-2 py-1.5 text-sm focus:border-gold focus:outline-none"
                  />
                </td>
                <td className="px-4 py-2.5">
                  <input
                    type="number"
                    step="1"
                    min="0"
                    max="100"
                    value={r.payoutPercent}
                    onChange={(e) => updateRow(r.employeeId, 'payoutPercent', e.target.value)}
                    placeholder="30"
                    className="w-24 bg-bg-primary border border-gold-border rounded px-2 py-1.5 text-sm focus:border-gold focus:outline-none"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button onClick={handleSave} disabled={isPending} loading={isPending}>Guardar</Button>
    </div>
  );
}
```

- [ ] **Step 3: Typecheck**

Run: `cd backoffice && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Manual verification in the browser**

With backend and backoffice running locally (see Task 8, Step 4), navigate to `/definicoes/contas-barbearia`. Confirm:
- Eduardo Gomes (or whichever employee has barbershop services) appears in the list.
- Setting Valor material = `1` and % Barbeiro = `30`, clicking Guardar, shows "Valores guardados." and no error.
- Reloading the page shows the saved values persisted (fields pre-filled).
- Navigate to `/barbearia` and confirm the amber "sem valor... configurado" banner from Task 8 no longer includes this barber, and the Material/% Barbeiro tabs now show real numbers instead of "—" for them.

- [ ] **Step 5: Commit**

```bash
git add "backoffice/app/(dashboard)/definicoes/contas-barbearia"
git commit -m "feat: add Contas Barbearia settings page for per-barber material cost and payout percent"
```

---

### Task 10: Full verification pass

**Files:** none (verification only)

- [ ] **Step 1: Run the full backend test suite**

Run: `cd backend && npm test`
Expected: all suites pass.

- [ ] **Step 2: Typecheck the backoffice**

Run: `cd backoffice && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Typecheck the frontend** (nothing in this plan touches the frontend, but confirm no accidental breakage)

Run: `cd frontend && npx tsc --noEmit 2>&1 | grep -v __tests__`
Expected: no output (the `__tests__` grep filters out the pre-existing, unrelated missing-Jest-types errors noted earlier in this project).

- [ ] **Step 4: End-to-end browser walkthrough**

With backend + backoffice running locally: log in as admin, visit `/estatisticas` (confirm unchanged/still works), `/barbearia` (period switching, tabs, banner), `/tatuagens`, `/nails` (both show "Em breve"), `/definicoes/contas-barbearia` (save + reload persistence). Confirm the sidebar shows all 4 Análise links and the Contas Barbearia link under Definições, for both an `admin` and (if convenient to test) `superadmin` login.

This task intentionally has no commit — it's a checkpoint before considering the plan done. If any step fails, fix it as part of the task that introduced the problem (amend that task's commit or add a small follow-up commit), not here.
