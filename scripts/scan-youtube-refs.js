const fs = require('fs');
const path = require('path');
const js = fs.readFileSync(path.join(__dirname, 'csm-bundle.js'), 'utf8');

const needles = ['youtube', 'youtu.be', 'UC', 'watch?v=', 'channel/', '@'];
for (const n of needles) {
  const idx = [];
  let i = 0;
  while ((i = js.indexOf(n, i)) !== -1 && idx.length < 20) {
    idx.push(i);
    i += n.length;
  }
  console.log('\n===', n, 'count~', (js.match(new RegExp(n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')) || []).length);
  for (const pos of idx.slice(0, 8)) {
    console.log(js.slice(Math.max(0, pos - 40), pos + 80).replace(/\n/g, ' '));
  }
}
