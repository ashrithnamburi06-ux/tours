const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');
const indexPath = path.join(__dirname, '..', 'index.html');
const orig = execSync('git show HEAD:tours/index.html', {
  cwd: repoRoot,
  encoding: 'utf8',
});

const start = orig.indexOf('<form class="filter-input two">');
const second = orig.indexOf('<form class="filter-input two">', start + 1);
const hotelBlock = orig.slice(start, second);

let cur = fs.readFileSync(indexPath, 'utf8');
if (cur.includes('filter-input two')) {
  console.log('Hotel form already present');
  process.exit(0);
}

const marker = '</form>\n';
const toursFormEnd = cur.indexOf('filter-input show');
const insertPos = cur.indexOf(marker, toursFormEnd) + marker.length;
cur = cur.slice(0, insertPos) + hotelBlock + cur.slice(insertPos);
fs.writeFileSync(indexPath, cur);
console.log('Restored hotel filter form');
