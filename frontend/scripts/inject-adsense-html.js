const fs = require('fs');
const path = require('path');
const { injectAdsenseSnippet } = require('../src/lib/injectAdsense');

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p);
    else if (ent.name.endsWith('.html')) {
      const before = fs.readFileSync(p, 'utf8');
      const after = injectAdsenseSnippet(before);
      if (after !== before) fs.writeFileSync(p, after);
    }
  }
}

walk(path.join(__dirname, '../.next/server'));
