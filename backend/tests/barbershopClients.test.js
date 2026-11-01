const { clientIdentity, mergeBarbershopClients } = require('../src/lib/barbershopClients');

describe('barbershop client stats', () => {
  it('groups placeholder emails by phone so walk-ins stay separate', () => {
    const first = clientIdentity({
      clientName: 'João',
      clientEmail: 'sem-contacto+abc@ganeshaink.pt',
      clientPhone: '913 111 111',
    });
    const second = clientIdentity({
      clientName: 'Joao',
      clientEmail: 'sem-contacto+xyz@ganeshaink.pt',
      clientPhone: '913111111',
    });
    expect(first.key).toBe(second.key);
    expect(first.key).toBe('phone:913111111');
  });

  it('ranks clients by cuts and spent', () => {
    const rows = mergeBarbershopClients(
      [
        { clientName: 'Ana', clientEmail: 'ana@test.com', clientPhone: '911', price: 12 },
        { clientName: 'Ana Silva', clientEmail: 'ana@test.com', clientPhone: '911', price: 18 },
        { clientName: 'Bruno', clientEmail: 'bruno@test.com', clientPhone: '922', price: 40 },
      ],
      (appointment) => appointment.price,
    );
    expect(rows[0]).toMatchObject({ name: 'Ana Silva', cuts: 2, spent: 30 });
    expect(rows[1]).toMatchObject({ name: 'Bruno', cuts: 1, spent: 40 });
  });
});
