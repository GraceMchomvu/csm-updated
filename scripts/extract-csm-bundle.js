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
        res.on('end', () => resolve(Buffer.concat(chunks)));
      })
      .on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location) {
          return downloadFile(new URL(res.headers.location, url).href, dest).then(resolve, reject);
        }
        if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => file.close(() => resolve(dest)));
        file.on('error', reject);
      })
      .on('error', reject);
  });
}

function collectImageRefs(text) {
  const urls = new Set();
  const patterns = [
    /["']([^"']+\.(?:jpg|jpeg|png|webp|gif|avif|svg))["']/gi,
    /assets\/[A-Za-z0-9._/-]+\.(?:jpg|jpeg|png|webp|gif|avif|svg)/gi,
    /https?:\/\/[^"'\s)]+\.(?:jpg|jpeg|png|webp|gif|avif)/gi,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(text))) {
      urls.add(m[1] || m[0]);
    }
  }
  return [...urls];
}

async function main() {
  const base = 'https://www.csm.church/';
  const html = (await get(base)).toString('utf8');
  const jsMatch = html.match(/src="(\.\/assets\/[^"]+\.js)"/);
  const cssMatch = html.match(/href="(\.\/assets\/[^"]+\.css)"/);
  if (!jsMatch) throw new Error('No JS bundle found');

  const jsUrl = new URL(jsMatch[1], base).href;
  console.log('JS', jsUrl);
  if (cssMatch) console.log('CSS', new URL(cssMatch[1], base).href);

  const js = (await get(jsUrl)).toString('utf8');
  fs.writeFileSync(path.join(__dirname, 'csm-bundle.js'), js);
  console.log('JS length', js.length);

  // Find lazy chunks
  const chunks = new Set();
  const chunkRe = /["'](\.?\/?assets\/[^"']+\.js)["']/g;
  let m;
  while ((m = chunkRe.exec(js))) chunks.add(m[1]);

  const allText = [js];
  for (const chunk of chunks) {
    try {
      const chunkUrl = new URL(chunk.replace(/^\.\//, ''), base).href;
      console.log('Fetching chunk', chunkUrl);
      const buf = await get(chunkUrl);
      allText.push(buf.toString('utf8'));
      fs.writeFileSync(path.join(__dirname, path.basename(chunk)), buf);
    } catch (e) {
      console.log('Chunk fail', chunk, e.message);
    }
  }

  // Also try common Vite asset listing by scanning for hashed image filenames in CSS
  if (cssMatch) {
    const cssUrl = new URL(cssMatch[1], base).href;
    const css = (await get(cssUrl)).toString('utf8');
    allText.push(css);
    fs.writeFileSync(path.join(__dirname, 'csm-bundle.css'), css);
  }

  const found = new Set();
  for (const text of allText) {
    collectImageRefs(text).forEach((u) => found.add(u));
  }

  // Normalize to absolute URLs
  const abs = [...found]
    .map((u) => {
      try {
        if (u.startsWith('http')) return u;
        if (u.startsWith('assets/') || u.startsWith('/assets/') || u.startsWith('./assets/')) {
          return new URL(u.replace(/^\.\//, '').replace(/^\//, ''), base).href;
        }
        if (u.startsWith('/')) return new URL(u, base).href;
        // relative hashed assets often appear as assets/foo-hash.jpg
        if (/\.(jpg|jpeg|png|webp|gif|avif|svg)$/i.test(u)) {
          return new URL(u.replace(/^\.\//, ''), base).href;
        }
        return null;
      } catch {
        return null;
      }
    })
    .filter(Boolean);

  const unique = [...new Set(abs)].sort();
  console.log('\n=== IMAGE URLS ===');
  unique.forEach((u) => console.log(u));
  console.log('TOTAL', unique.length);

  const outDir = path.join(__dirname, '..', 'assets', 'images', 'csm');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'sources.json'), JSON.stringify(unique, null, 2));

  const downloadables = unique.filter(
    (u) =>
      /\.(jpg|jpeg|png|webp|gif|avif)$/i.test(u.split('?')[0]) &&
      !/favicon|sprite|icon-|\.svg$/i.test(u)
  );

  console.log('\nDownloading', downloadables.length);
  let i = 0;
  const saved = [];
  for (const url of downloadables) {
    i++;
    const name = path.basename(new URL(url).pathname).replace(/[^a-zA-Z0-9._-]/g, '_');
    const dest = path.join(outDir, name || `image-${i}.jpg`);
    try {
      await downloadFile(url, dest);
      console.log('OK', name);
      saved.push({ url, file: name });
    } catch (e) {
      console.log('FAIL', url, e.message);
    }
  }
  fs.writeFileSync(path.join(outDir, 'downloaded.json'), JSON.stringify(saved, null, 2));
  console.log('Saved', saved.length, 'images');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
