const app = require('./app');
const { startReminderCron } = require('./lib/reminderCron');

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`API running on ${HOST}:${PORT}`);
  startReminderCron();
});
