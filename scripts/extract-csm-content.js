const https = require('https');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

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
  const base = 'https://www.csm.church/';
  const html = await get(base);
  const jsMatch = html.match(/src="(\.\/assets\/[^"]+\.js)"/);
  const js = await get(new URL(jsMatch[1], base).href);
  // Extract readable strings that look like content
  const strings = [...js.matchAll(/"((?:[^"\\]|\\.){12,200})"/g)]
    .map((m) => m[1].replace(/\\n/g, '\n').replace(/\\"/g, '"'))
    .filter(
      (s) =>
        /Christ|CSM|Prophet|Arusha|worship|service|mission|vision|phone|\+255|email|@|Karibu|ministry|gospel|Holy Spirit|Thursday|Saturday|Sunday/i.test(
          s
        ) && !s.includes('function') && !s.includes('=>')
    );
  const unique = [...new Set(strings)];
  fs.writeFileSync(path.join(__dirname, 'csm-content-strings.json'), JSON.stringify(unique, null, 2));
  console.log('Saved', unique.length, 'strings');
  unique.slice(0, 80).forEach((s) => console.log('---\n' + s));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
