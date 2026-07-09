const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

function fetchText(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    lib
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location) {
          if (redirects > 8) return reject(new Error('Too many redirects'));
          const next = new URL(res.headers.location, url).href;
          return fetchText(next, redirects + 1).then(resolve).catch(reject);
        }
        let d = '';
        res.setEncoding('utf8');
        res.on('data', (c) => (d += c));
        res.on('end', () => resolve({ html: d, finalUrl: url, status: res.statusCode }));
      })
      .on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    lib
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location) {
          const next = new URL(res.headers.location, url).href;
          return downloadFile(next, dest).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => file.close(() => resolve(dest)));
        file.on('error', reject);
      })
      .on('error', reject);
  });
}

function absolutize(base, u) {
  try {
    return new URL(u, base).href;
  } catch {
    return null;
  }
}

function extractUrls(html, base) {
  const urls = new Set();
  const patterns = [
    /(?:src|srcset|content|href)=["']([^"']+\.(?:jpg|jpeg|png|webp|gif|avif)(?:\?[^"']*)?)/gi,
    /url\((['"]?)([^)'"]+\.(?:jpg|jpeg|png|webp|gif|avif)(?:\?[^)']*)?)\1\)/gi,
    /"(https?:\/\/[^"]+\.(?:jpg|jpeg|png|webp|gif|avif)[^"]*)"/gi,
    /'(https?:\/\/[^']+\.(?:jpg|jpeg|png|webp|gif|avif)[^']*)'/gi,
    /\/_next\/image\?[^"'\\\s]+/gi,
  ];

  for (const re of patterns) {
    let m;
    while ((m = re.exec(html))) {
      const raw = m[2] || m[1] || m[0];
      if (!raw) continue;
      // srcset can have multiple
      const parts = raw.split(',').map((p) => p.trim().split(/\s+/)[0]);
      for (const p of parts) {
        if (p.includes('/_next/image')) {
          try {
            const full = absolutize(base, p);
            const u = new URL(full);
            const orig = u.searchParams.get('url');
            if (orig) urls.add(absolutize(base, decodeURIComponent(orig)));
            urls.add(full);
          } catch {}
        } else {
          const abs = absolutize(base, p);
          if (abs) urls.add(abs);
        }
      }
    }
  }
  return [...urls].filter(Boolean);
}

async function main() {
  const pages = [
    'https://www.csm.church',
    'https://www.csm.church/',
    'https://csm.church',
    'https://www.csm.church/about',
    'https://www.csm.church/gallery',
    'https://www.csm.church/media',
    'https://www.csm.church/sermons',
    'https://www.csm.church/events',
    'https://www.csm.church/contact',
    'https://www.csm.church/visit',
  ];

  const all = new Set();
  for (const page of pages) {
    try {
      const { html, finalUrl, status } = await fetchText(page);
      console.log(`Fetched ${page} -> ${status} (${html.length} bytes)`);
      const urls = extractUrls(html, finalUrl);
      console.log(`  found ${urls.length} image refs`);
      urls.forEach((u) => all.add(u));
      // dump __NEXT_DATA__ image paths if present
      const nd = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
      if (nd) {
        const json = nd[1];
        const imgRe = /https?:\\\/\\\/[^"\\]+?\.(?:jpg|jpeg|png|webp|gif|avif)/gi;
        let m;
        while ((m = imgRe.exec(json))) {
          all.add(m[0].replace(/\\\//g, '/'));
        }
        const relRe = /\\\/(?:images|uploads|media|assets|static)[^"\\]+?\.(?:jpg|jpeg|png|webp|gif|avif)/gi;
        while ((m = relRe.exec(json))) {
          const abs = absolutize(finalUrl, m[0].replace(/\\\//g, '/'));
          if (abs) all.add(abs);
        }
      }
    } catch (e) {
      console.log(`Skip ${page}: ${e.message}`);
    }
  }

  const list = [...all].sort();
  console.log('\n=== ALL IMAGE URLS ===');
  list.forEach((u) => console.log(u));
  console.log('TOTAL', list.length);

  const outDir = path.join(__dirname, '..', 'assets', 'images', 'csm');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'sources.json'), JSON.stringify(list, null, 2));

  // Prefer original image URLs over next/image wrappers
  const downloadables = list.filter(
    (u) =>
      !u.includes('/_next/image') &&
      /\.(jpg|jpeg|png|webp|gif|avif)(\?|$)/i.test(u) &&
      !u.includes('favicon') &&
      !u.includes('sprite')
  );

  console.log('\nDownloading', downloadables.length, 'files to', outDir);
  let i = 0;
  for (const url of downloadables) {
    i++;
    try {
      const u = new URL(url);
      let name = path.basename(u.pathname).replace(/[^a-zA-Z0-9._-]/g, '_');
      if (!name || name === '_' || !/\./.test(name)) name = `image-${i}.jpg`;
      // avoid collisions
      let dest = path.join(outDir, name);
      if (fs.existsSync(dest)) {
        const ext = path.extname(name);
        const base = path.basename(name, ext);
        dest = path.join(outDir, `${base}-${i}${ext}`);
      }
      await downloadFile(url, dest);
      console.log('OK', name);
    } catch (e) {
      console.log('FAIL', url, e.message);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
