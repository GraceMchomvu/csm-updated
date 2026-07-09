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
  const yt = [...js.matchAll(/youtube\.com\/[A-Za-z0-9@._\/?=&\-%]+/gi)].map((m) => m[0]);
  const youtu = [...js.matchAll(/youtu\.be\/[A-Za-z0-9_-]+/gi)].map((m) => m[0]);
  console.log('from bundle:', [...new Set([...yt, ...youtu])].join('\n') || '(none)');

  // Try common searches via YouTube RSS / channel pages
  const candidates = [
    'https://www.youtube.com/@propheticpowertvp',
    'https://www.youtube.com/@BarakaOgilloLive',
    'https://www.youtube.com/@barakaogillo',
    'https://www.youtube.com/@ChristSynagogueMinistries',
    'https://www.youtube.com/@csmchurch',
    'https://www.youtube.com/@ProphetBarakaOgillo',
    'https://www.youtube.com/@prophetbaraka',
  ];
  for (const url of candidates) {
    try {
      const html = await get(url);
      const channelId = (html.match(/"channelId":"(UC[\w-]+)"/) || [])[1];
      const title = (html.match(/<title>([^<]+)<\/title>/) || [])[1];
      const ok = html.includes('channelId') || html.includes('og:title');
      console.log(url, '->', title, channelId || 'no-id', 'len', html.length, ok ? 'OK' : 'MISS');
    } catch (e) {
      console.log(url, 'FAIL', e.message);
    }
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
