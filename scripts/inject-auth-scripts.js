const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const SNIPPET = '    <script src="js/api.js"></script>\n    <script src="js/auth.js"></script>\n';

const skip = new Set(['admin', 'node_modules', 'backend', 'scripts', 'css', 'js', 'images']);

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    if (skip.has(name)) continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, files);
    else if (name.endsWith('.html')) files.push(full);
  }
  return files;
}

let updated = 0;
for (const file of walk(root)) {
  let html = fs.readFileSync(file, 'utf8');
  if (!html.includes('primary-btn1 black-bg')) continue;
  if (html.includes('js/api.js') && html.includes('js/auth.js')) continue;

  const relPrefix = file.includes(path.sep + 'admin' + path.sep) ? '../' : '';
  const snippet = SNIPPET.replace(/js\//g, relPrefix + 'js/');

  if (html.includes('</body>')) {
    html = html.replace('</body>', snippet + '</body>');
    fs.writeFileSync(file, html);
    updated++;
  }
}

console.log('Injected auth scripts into', updated, 'HTML files.');
