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
  const html = await get('https://www.csm.church/');
  const cssMatch = html.match(/href="(\.\/assets\/[^"]+\.css)"/);
  const cssUrl = new URL(cssMatch[1], 'https://www.csm.church/').href;
  const css = await get(cssUrl);
  fs.writeFileSync(path.join(__dirname, 'csm-colors.css'), css);

  const colors = new Set();
  const re = /#(?:[0-9a-fA-F]{3,8})\b|rgba?\([^)]+\)|hsla?\([^)]+\)/g;
  let m;
  while ((m = re.exec(css))) colors.add(m[0]);

  // also CSS vars
  const vars = [...css.matchAll(/--([a-zA-Z0-9-_]+)\s*:\s*([^;]+);/g)].map(
    (x) => `${x[1]}: ${x[2].trim()}`
  );

  console.log('VARS\n' + vars.slice(0, 80).join('\n'));
  console.log('\nCOLORS sample');
  [...colors]
    .filter((c) => /#|rgb|hsl/.test(c))
    .slice(0, 60)
    .forEach((c) => console.log(c));
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
