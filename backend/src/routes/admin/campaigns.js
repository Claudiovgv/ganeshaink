const router = require('express').Router();
const { authenticate } = require('../../middleware/auth');
const { readClicks, readRsvps, summarize } = require('../campaigns');

router.use(authenticate);

router.get('/halloween-flash', async (req, res) => {
  try {
    const summary = summarize(await readRsvps());
    res.json({
      clicks: await readClicks(),
      ...summary,
    });
  } catch (err) {
    res.status(500).json({ error: 'Não foi possível ler a Flash Party' });
  }
});

module.exports = router;
