const https = require('https');
const fs = require('fs');
const path = require('path');

function get(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location) {
          return get(new URL(res.headers.location, url).href).then(resolve, reject);
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
      })
      .on('error', reject);
  });
}

(async () => {
  const js = fs.readFileSync(path.join(__dirname, 'csm-bundle.js'), 'utf8');
  const keys = [
    'give',
    'Give',
    'tithe',
    'offering',
    'M-Pesa',
    'Mpesa',
    'mpesa',
    'bank',
    'account',
    'PayPal',
    'donation',
    'partner',
    'mobile money',
  ];
  for (const key of keys) {
    let i = 0;
    let count = 0;
    while ((i = js.indexOf(key, i)) !== -1 && count < 5) {
      console.log(`\n[${key}]`, js.slice(Math.max(0, i - 60), i + 160).replace(/\n/g, ' '));
      i += key.length;
      count++;
    }
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
