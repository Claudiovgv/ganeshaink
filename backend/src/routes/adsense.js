const router = require('express').Router();
const { isAdsenseEnabled } = require('../lib/adsense');

router.get('/', async (req, res) => {
  try {
    res.set('Cache-Control', 'public, max-age=30');
    res.json({ enabled: await isAdsenseEnabled() });
  } catch {
    res.json({ enabled: false });
  }
});

module.exports = router;
