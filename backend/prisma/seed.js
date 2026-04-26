const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const admin = await prisma.user.upsert({
    where: { email: 'admin@ganeshaink.pt' },
    update: {},
    create: { name: 'Admin', email: 'admin@ganeshaink.pt', password: await bcrypt.hash('admin123', 10), role: 'admin' },
  });
  console.log('✓ Admin:', admin.email);

  const barbUser = await prisma.user.upsert({
    where: { email: 'joao@ganeshaink.pt' },
    update: {},
    create: {
      name: 'João Silva', email: 'joao@ganeshaink.pt', password: await bcrypt.hash('barb123', 10), role: 'employee',
      employee: { create: { name: 'João Silva', bio: 'Especialista em cortes modernos e degradê com 5 anos de experiência.', isActive: true } },
    },
    include: { employee: true },
  });
  console.log('✓ Barbeiro:', barbUser.email);

  const services = await Promise.all([
    prisma.service.upsert({ where: { id: 1 }, update: {}, create: { id: 1, name: 'Corte Simples', category: 'barbershop', description: 'Corte de cabelo clássico.', durationMin: 30, price: 12.00 } }),
    prisma.service.upsert({ where: { id: 2 }, update: {}, create: { id: 2, name: 'Corte Degradê', category: 'barbershop', description: 'Corte moderno em degradê.', durationMin: 45, price: 15.00 } }),
    prisma.service.upsert({ where: { id: 3 }, update: {}, create: { id: 3, name: 'Barba', category: 'barbershop', description: 'Aparar e modelar a barba.', durationMin: 20, price: 8.00 } }),
    prisma.service.upsert({ where: { id: 4 }, update: {}, create: { id: 4, name: 'Corte + Barba', category: 'barbershop', description: 'Pacote completo cabelo e barba.', durationMin: 50, price: 18.00 } }),
    prisma.service.upsert({ where: { id: 5 }, update: {}, create: { id: 5, name: 'Tatuagem Pequena', category: 'tattoo', description: 'Tatuagem até 5cm.', durationMin: 90, price: 60.00, requiresConsultation: true } }),
    prisma.service.upsert({ where: { id: 6 }, update: {}, create: { id: 6, name: 'Tatuagem Média', category: 'tattoo', description: 'Tatuagem entre 5-15cm.', durationMin: 180, price: 120.00, requiresConsultation: true } }),
    prisma.service.upsert({ where: { id: 7 }, update: {}, create: { id: 7, name: 'Piercing Simples', category: 'piercing', description: 'Piercing com material incluído.', durationMin: 30, price: 25.00, requiresConsultation: true } }),
    prisma.service.upsert({ where: { id: 8 }, update: {}, create: { id: 8, name: 'Gel Completo', category: 'nails', description: 'Aplicação completa de gel.', durationMin: 60, price: 35.00 } }),
    prisma.service.upsert({ where: { id: 9 }, update: {}, create: { id: 9, name: 'Gel + Decoração', category: 'nails', description: 'Gel com nail art incluída.', durationMin: 90, price: 45.00 } }),
  ]);
  console.log(`✓ ${services.length} serviços criados`);

  const empId = barbUser.employee.id;
  await prisma.employeeService.createMany({
    data: [1, 2, 3, 4].map(sid => ({ employeeId: empId, serviceId: sid })),
    skipDuplicates: true,
  });

  await prisma.workSchedule.deleteMany({ where: { employeeId: empId } });
  await prisma.workSchedule.createMany({
    data: [1, 2, 3, 4, 5].map(day => ({ employeeId: empId, dayOfWeek: day, startTime: '09:00', endTime: '18:00', isActive: true })),
  });
  console.log('✓ Horário semanal configurado (Seg-Sex 09:00-18:00)');

  console.log('\n✅ Seed completo!');
  console.log('Admin login: admin@ganeshaink.pt / admin123');
  console.log('Barbeiro login: joao@ganeshaink.pt / barb123');
}

main().catch(console.error).finally(() => prisma.$disconnect());
