const { getAvailableSlots } = require('../src/services/availability.service');

describe('getAvailableSlots', () => {
  // 2026-04-28 is a Tuesday (dayOfWeek = 2)
  // Europe/Lisbon in April = UTC+1

  const baseEmployee = {
    id: 1,
    workSchedules: [
      { dayOfWeek: 2, startTime: '09:00', endTime: '13:00', isActive: true },
    ],
    timeBlocks: [],
    appointments: [],
  };

  it('returns a 15-minute grid for a 60min service', () => {
    const slots = getAvailableSlots(baseEmployee, '2026-04-28', 60);
    expect(slots[0]).toBe('09:00');
    expect(slots).toContain('09:15');
    expect(slots).toContain('12:00');
    expect(slots).not.toContain('12:15');
    expect(slots).toHaveLength(13);
  });

  it('returns a 15-minute grid for a 30min service', () => {
    const slots = getAvailableSlots(baseEmployee, '2026-04-28', 30);
    expect(slots[0]).toBe('09:00');
    expect(slots[slots.length - 1]).toBe('12:30');
    expect(slots).toHaveLength(15);
  });

  it('includes in-between times for a 75min service, not only every 75 minutes', () => {
    const emp = {
      ...baseEmployee,
      workSchedules: [{ dayOfWeek: 2, startTime: '11:30', endTime: '19:00', isActive: true }],
    };
    const slots = getAvailableSlots(emp, '2026-04-28', 75);
    expect(slots).toContain('11:30');
    expect(slots).toContain('12:00');
    expect(slots).toContain('12:45');
    expect(slots).toContain('17:45');
    expect(slots).not.toContain('18:00');
  });

  it('returns empty array for a non-working day', () => {
    const slots = getAvailableSlots(baseEmployee, '2026-04-29', 60);
    expect(slots).toHaveLength(0);
  });

  it('excludes slots blocked by time blocks', () => {
    const emp = {
      ...baseEmployee,
      timeBlocks: [{
        startDatetime: new Date('2026-04-28T10:00:00.000Z'),
        endDatetime: new Date('2026-04-28T11:00:00.000Z'),
      }],
    };
    const slots = getAvailableSlots(emp, '2026-04-28', 60);
    expect(slots).not.toContain('11:00');
    expect(slots).toContain('09:00');
    expect(slots).toContain('10:00');
    expect(slots).toContain('12:00');
  });

  it('excludes slots occupied by confirmed appointments', () => {
    const emp = {
      ...baseEmployee,
      appointments: [{
        startDatetime: new Date('2026-04-28T09:00:00.000Z'),
        endDatetime: new Date('2026-04-28T10:00:00.000Z'),
        status: 'confirmed',
      }],
    };
    const slots = getAvailableSlots(emp, '2026-04-28', 60);
    expect(slots).not.toContain('10:00');
    expect(slots).toContain('09:00');
    expect(slots).toContain('11:00');
    expect(slots).toContain('12:00');
  });

  it('does NOT exclude cancelled appointments', () => {
    const emp = {
      ...baseEmployee,
      appointments: [{
        startDatetime: new Date('2026-04-28T09:00:00.000Z'),
        endDatetime: new Date('2026-04-28T10:00:00.000Z'),
        status: 'cancelled',
      }],
    };
    const slots = getAvailableSlots(emp, '2026-04-28', 60);
    expect(slots).toContain('10:00');
    expect(slots).toHaveLength(13);
  });

  it('last slot must fit entirely within work hours', () => {
    const slots = getAvailableSlots(baseEmployee, '2026-04-28', 90);
    expect(slots).toContain('09:00');
    expect(slots).toContain('11:30');
    expect(slots).not.toContain('12:00');
  });
});
