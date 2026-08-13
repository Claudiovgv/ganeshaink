// Importação pontual das marcações recebidas fora do site (telefone/WhatsApp)
// enquanto o artista Eduardo Gomes estava desativado no site. Corre uma vez,
// localmente, contra a base de dados de produção — não faz parte do deploy normal.
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const { fromZonedTime } = require('date-fns-tz');
const { addMinutes } = require('date-fns');
const prisma = require('../src/config/database');

const TIMEZONE = 'Europe/Lisbon';
const EMPLOYEE_NAME = 'Eduardo Gomes';

// name -> [serviceId, nickname?]
// Os marcados com allowOverlap:true sobrepõem-se de propósito (confirmado
// com o negócio — o artista atende duas pessoas ao mesmo tempo nesses casos).
const BOOKINGS = [
  { date: '2026-08-13', time: '10:00', name: 'Eduardo', nickname: 'GNR', serviceId: 5, allowOverlap: true },
  { date: '2026-08-13', time: '11:00', name: 'Irmão Caroline', serviceId: 12, allowOverlap: true },
  { date: '2026-08-13', time: '14:00', name: 'Carlos Santos', serviceId: 4 },

  { date: '2026-08-14', time: '09:30', name: 'Ze gato', serviceId: 7 },
  { date: '2026-08-14', time: '10:30', name: 'Fortuna', serviceId: 7 },
  { date: '2026-08-14', time: '14:00', name: 'Rafael', serviceId: 4, allowOverlap: true },
  { date: '2026-08-14', time: '15:00', name: 'Rafael', serviceId: 12, allowOverlap: true },
  { date: '2026-08-14', time: '16:00', name: 'Rafael', serviceId: 12 },
  { date: '2026-08-14', time: '17:00', name: 'Rafael Henrique', serviceId: 13 },
  { date: '2026-08-14', time: '18:00', name: 'Joao Coelho', serviceId: 12 },

  { date: '2026-08-15', time: '09:30', name: 'Sidónio', serviceId: 7 },
  { date: '2026-08-15', time: '14:00', name: 'Sr Manuel', serviceId: 1 },
  { date: '2026-08-15', time: '14:30', name: 'Oliveira', serviceId: 15 },

  { date: '2026-08-19', time: '14:00', name: 'Sr Manuel', serviceId: 1 },

  { date: '2026-08-21', time: '09:30', name: 'Pedro Pina', serviceId: 4, allowOverlap: true },
  { date: '2026-08-21', time: '10:30', name: 'leandro pina', serviceId: 12, allowOverlap: true },
  { date: '2026-08-21', time: '11:30', name: 'Luis Silva', serviceId: 8 },

  { date: '2026-08-22', time: '10:00', name: 'Ricardo Tavares', serviceId: 12 },
  { date: '2026-08-22', time: '11:00', name: 'Ricardo Tavares', serviceId: 12 },

  { date: '2026-08-24', time: '09:30', name: 'Joao carvalho silva', serviceId: 12 },
  { date: '2026-08-24', time: '10:30', name: 'Joao carvalho silva', serviceId: 12 },
  { date: '2026-08-24', time: '11:30', name: 'Joao carvalho silva', serviceId: 12 },
  { date: '2026-08-24', time: '18:00', name: 'Bermudez', serviceId: 12 },

  { date: '2026-08-27', time: '09:30', name: 'Chnntoph', serviceId: 4 },

  { date: '2026-08-29', time: '09:30', name: 'Joao paulo', serviceId: 12 },
  { date: '2026-08-29', time: '14:00', name: 'Sr Manuel', serviceId: 1 },
];

// Bloqueio pontual (não é dia inteiro).
const BLOCKS = [
  { date: '2026-08-27', startTime: '15:30', endTime: '19:00', reason: 'Dentista' },
];

function placeholderContact() {
  const token = uuidv4().slice(0, 8);
  return { email: `sem-contacto+${token}@ganeshaink.pt`, phone: 'Sem contacto' };
}

async function main() {
  const employee = await prisma.employee.findFirst({ where: { name: EMPLOYEE_NAME } });
  if (!employee) throw new Error(`Funcionário "${EMPLOYEE_NAME}" não encontrado`);

  const serviceIds = [...new Set(BOOKINGS.map((b) => b.serviceId))];
  const services = await prisma.service.findMany({ where: { id: { in: serviceIds } } });
  const serviceById = Object.fromEntries(services.map((s) => [s.id, s]));

  let created = 0;
  for (const b of BOOKINGS) {
    const service = serviceById[b.serviceId];
    if (!service) throw new Error(`Serviço ${b.serviceId} não encontrado`);

    const startDatetime = fromZonedTime(new Date(`${b.date}T${b.time}:00`), TIMEZONE);
    const endDatetime = addMinutes(startDatetime, service.durationMin);

    if (!b.allowOverlap) {
      const conflict = await prisma.appointment.findFirst({
        where: {
          employeeId: employee.id,
          status: { not: 'cancelled' },
          startDatetime: { lt: endDatetime },
          endDatetime: { gt: startDatetime },
        },
      });
      if (conflict) {
        console.log(`SKIP (conflito): ${b.date} ${b.time} ${b.name}`);
        continue;
      }
    }

    const { email, phone } = placeholderContact();
    await prisma.appointment.create({
      data: {
        clientName: b.name,
        clientEmail: email,
        clientPhone: phone,
        employeeId: employee.id,
        serviceId: service.id,
        startDatetime,
        endDatetime,
        status: 'confirmed',
        notes: 'Marcação manual (recuperada fora do site, Ago/2026).',
        cancelToken: uuidv4(),
      },
    });

    if (b.nickname) {
      await prisma.clientNickname.create({ data: { email, nickname: b.nickname } });
    }

    created++;
    console.log(`OK: ${b.date} ${b.time} ${b.name} — ${service.name}${b.nickname ? ` (${b.nickname})` : ''}`);
  }

  for (const blk of BLOCKS) {
    const startDatetime = fromZonedTime(new Date(`${blk.date}T${blk.startTime}:00`), TIMEZONE);
    const endDatetime = fromZonedTime(new Date(`${blk.date}T${blk.endTime}:00`), TIMEZONE);
    await prisma.timeBlock.create({
      data: { employeeId: employee.id, startDatetime, endDatetime, type: 'custom', reason: blk.reason },
    });
    console.log(`Bloqueio criado: ${blk.date} ${blk.startTime}-${blk.endTime} (${blk.reason})`);
  }

  console.log(`\n${created}/${BOOKINGS.length} marcações criadas.`);
}

main()
  .catch((err) => { console.error(err); process.exit(1); })
  .finally(() => prisma.$disconnect());
