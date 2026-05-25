const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const PAGE_SCRIPTS = [
  'js/packages.js',
  'js/faq.js',
  'js/homepage.js',
  'js/guiders.js',
  'js/inspirations.js',
  'js/inspiration-details.js',
  'js/destination-details.js',
  'js/destinations.js',
  'js/package-details.js',
];

let updated = 0;
for (const rel of PAGE_SCRIPTS) {
  const needle = `<script src="${rel}"></script>`;
  const insert = `    <script src="js/api.js"></script>\n    <script src="${rel}"></script>`;
  const files = [];
  function walk(dir) {
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      if (fs.statSync(full).isDirectory()) {
        if (!['node_modules', 'backend', 'admin'].includes(name)) walk(full);
      } else if (name.endsWith('.html')) files.push(full);
    }
  }
  walk(root);
  for (const file of files) {
    let html = fs.readFileSync(file, 'utf8');
    if (!html.includes(needle)) continue;
    if (html.includes(insert)) continue;
    if (html.includes('js/api.js') && html.indexOf('js/api.js') < html.indexOf(needle)) continue;
    html = html.replace(needle, insert);
    fs.writeFileSync(file, html);
    updated++;
  }
}
console.log('Inserted api.js before page scripts in', updated, 'places.');
