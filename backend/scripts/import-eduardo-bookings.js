// Importação pontual das marcações recebidas fora do site (telefone/WhatsApp)
// enquanto o artista Eduardo Gomes estava desativado no site. Corre uma vez
// (localmente ou no servidor, contra qualquer base de dados) — não faz parte
// do deploy normal. Resolve o serviço pelo NOME (não pelo id), porque o id
// dos serviços difere entre a base de dados local e a de produção.
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const { fromZonedTime } = require('date-fns-tz');
const { addMinutes } = require('date-fns');
const prisma = require('../src/config/database');

const TIMEZONE = 'Europe/Lisbon';
const EMPLOYEE_NAME = 'Eduardo Gomes';

// Os marcados com allowOverlap:true sobrepõem-se de propósito (confirmado
// com o negócio — o artista atende duas pessoas ao mesmo tempo nesses casos).
const BOOKINGS = [
  { date: '2026-08-13', time: '10:00', name: 'Eduardo', nickname: 'GNR', service: 'Tesoura + Barba Detalhada', allowOverlap: true },
  { date: '2026-08-13', time: '11:00', name: 'Irmão Caroline', service: 'Degradê', allowOverlap: true },
  { date: '2026-08-13', time: '14:00', name: 'Carlos Santos', service: 'Degradê + Barba Detalhada' },

  { date: '2026-08-14', time: '09:30', name: 'Ze gato', service: 'Corte Raspado + Barba Detalhada' },
  { date: '2026-08-14', time: '10:30', name: 'Fortuna', service: 'Corte Raspado + Barba Detalhada' },
  { date: '2026-08-14', time: '14:00', name: 'Rafael', service: 'Degradê + Barba Detalhada', allowOverlap: true },
  { date: '2026-08-14', time: '15:00', name: 'Rafael', service: 'Degradê', allowOverlap: true },
  { date: '2026-08-14', time: '16:00', name: 'Rafael', service: 'Degradê' },
  { date: '2026-08-14', time: '17:00', name: 'Rafael Henrique', service: 'Corte a Tesoura' },
  { date: '2026-08-14', time: '18:00', name: 'Joao Coelho', service: 'Degradê' },

  { date: '2026-08-15', time: '09:30', name: 'Sidónio', service: 'Corte Raspado + Barba Detalhada' },
  { date: '2026-08-15', time: '14:00', name: 'Sr Manuel', service: 'Barba Raspada' },
  { date: '2026-08-15', time: '14:30', name: 'Oliveira', service: 'Corte Rapado' },

  { date: '2026-08-19', time: '14:00', name: 'Sr Manuel', service: 'Barba Raspada' },

  { date: '2026-08-21', time: '09:30', name: 'Pedro Pina', service: 'Degradê + Barba Detalhada', allowOverlap: true },
  { date: '2026-08-21', time: '10:30', name: 'leandro pina', service: 'Degradê', allowOverlap: true },
  { date: '2026-08-21', time: '11:30', name: 'Luis Silva', service: 'Corte Degradê + Barba Raspada' },

  { date: '2026-08-22', time: '10:00', name: 'Ricardo Tavares', service: 'Degradê' },
  { date: '2026-08-22', time: '11:00', name: 'Ricardo Tavares', service: 'Degradê' },

  { date: '2026-08-24', time: '09:30', name: 'Joao carvalho silva', service: 'Degradê' },
  { date: '2026-08-24', time: '10:30', name: 'Joao carvalho silva', service: 'Degradê' },
  { date: '2026-08-24', time: '11:30', name: 'Joao carvalho silva', service: 'Degradê' },
  { date: '2026-08-24', time: '18:00', name: 'Bermudez', service: 'Degradê' },

  { date: '2026-08-27', time: '09:30', name: 'Chnntoph', service: 'Degradê + Barba Detalhada' },

  { date: '2026-08-29', time: '09:30', name: 'Joao paulo', service: 'Degradê' },
  { date: '2026-08-29', time: '14:00', name: 'Sr Manuel', service: 'Barba Raspada' },
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
  const employee = await prisma.employee.findFirst({
    where: { name: EMPLOYEE_NAME },
    include: { services: { include: { service: true } } },
  });
  if (!employee) throw new Error(`Funcionário "${EMPLOYEE_NAME}" não encontrado`);

  const serviceByName = Object.fromEntries(employee.services.map((es) => [es.service.name, es.service]));

  // Falha já no início se algum nome de serviço não existir — mais seguro
  // do que descobrir a meio da importação.
  const missing = [...new Set(BOOKINGS.map((b) => b.service))].filter((name) => !serviceByName[name]);
  if (missing.length > 0) {
    throw new Error(`Serviços não encontrados para ${EMPLOYEE_NAME}: ${missing.join(', ')}`);
  }

  let created = 0;
  for (const b of BOOKINGS) {
    const service = serviceByName[b.service];

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
