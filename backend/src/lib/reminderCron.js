const cron = require('node-cron');
const { sendDueReminders } = require('./notifications');

function startReminderCron() {
  if (process.env.NODE_ENV === 'test') return;
  cron.schedule('*/15 * * * *', async () => {
    try {
      const sent = await sendDueReminders();
      if (sent > 0) console.log(`[reminders] sent ${sent} 24h reminder(s)`);
    } catch (err) {
      console.error('[reminders] failed:', err.message);
    }
  });
}

module.exports = { startReminderCron };
