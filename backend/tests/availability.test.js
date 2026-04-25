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

  it('returns correct slots for a working day (60min service)', () => {
    const slots = getAvailableSlots(baseEmployee, '2026-04-28', 60);
    // 09:00-13:00 with 60min slots = 09:00, 10:00, 11:00, 12:00
    expect(slots).toHaveLength(4);
    expect(slots[0]).toBe('09:00');
    expect(slots[3]).toBe('12:00');
  });

  it('returns correct slots for a working day (30min service)', () => {
    const slots = getAvailableSlots(baseEmployee, '2026-04-28', 30);
    // 09:00-13:00 with 30min slots = 8 slots
    expect(slots).toHaveLength(8);
    expect(slots[0]).toBe('09:00');
    expect(slots[7]).toBe('12:30');
  });

  it('returns empty array for a non-working day', () => {
    // 2026-04-29 is a Wednesday (dayOfWeek = 3) — not in schedule
    const slots = getAvailableSlots(baseEmployee, '2026-04-29', 60);
    expect(slots).toHaveLength(0);
  });

  it('excludes slots blocked by time blocks', () => {
    // Block 11:00-12:00 Lisbon = 10:00-11:00 UTC (April, UTC+1)
    const emp = {
      ...baseEmployee,
      timeBlocks: [{
        startDatetime: new Date('2026-04-28T10:00:00.000Z'),
        endDatetime: new Date('2026-04-28T11:00:00.000Z'),
      }],
    };
    const slots = getAvailableSlots(emp, '2026-04-28', 60);
    // 11:00 slot is blocked, remaining: 09:00, 10:00, 12:00
    expect(slots).not.toContain('11:00');
    expect(slots).toContain('09:00');
    expect(slots).toContain('10:00');
    expect(slots).toContain('12:00');
    expect(slots).toHaveLength(3);
  });

  it('excludes slots occupied by confirmed appointments', () => {
    // Appointment at 10:00-11:00 Lisbon = 09:00-10:00 UTC
    const emp = {
      ...baseEmployee,
      appointments: [{
        startDatetime: new Date('2026-04-28T09:00:00.000Z'),
        endDatetime: new Date('2026-04-28T10:00:00.000Z'),
        status: 'confirmed',
      }],
    };
    const slots = getAvailableSlots(emp, '2026-04-28', 60);
    // 10:00 slot blocked, remaining: 09:00, 11:00, 12:00
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
    // Cancelled → slot is free
    expect(slots).toContain('10:00');
    expect(slots).toHaveLength(4);
  });

  it('last slot must fit entirely within work hours', () => {
    // 09:00-13:00, 90min service: 09:00, 10:30 only (12:00+90min = 13:30 > 13:00)
    const slots = getAvailableSlots(baseEmployee, '2026-04-28', 90);
    expect(slots).toContain('09:00');
    expect(slots).toContain('10:30');
    expect(slots).not.toContain('12:00');
    expect(slots).toHaveLength(2);
  });
});
