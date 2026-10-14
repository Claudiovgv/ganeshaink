const {
  appointmentConfirmedEmail,
  appointmentReceivedEmail,
  reminderEmail,
  staffNewAppointmentEmail,
} = require('../src/lib/emailTemplates');

const appointment = {
  id: 42,
  clientName: 'Ana Cliente',
  cancelToken: 'token-ana-123',
  startDatetime: new Date('2026-06-10T09:00:00Z'),
  employee: { name: 'Eduardo Gomes' },
  service: { name: 'Degradê' },
};

describe('client appointment emails', () => {
  it('confirmed email includes a cancel link with the token', () => {
    const { html } = appointmentConfirmedEmail(appointment);
    expect(html).toContain('/cancelar/token-ana-123');
    expect(html).toContain('Cancelar marcação');
    expect(html).not.toContain('Para alterar ou cancelar uma marcação, contacta-nos diretamente.');
  });

  it('received and reminder emails also include the cancel link', () => {
    expect(appointmentReceivedEmail(appointment).html).toContain('/cancelar/token-ana-123');
    expect(reminderEmail(appointment).html).toContain('/cancelar/token-ana-123');
  });

  it('staff emails do not include the client cancel link', () => {
    const { html } = staffNewAppointmentEmail(appointment);
    expect(html).not.toContain('/cancelar/token-ana-123');
  });
});
