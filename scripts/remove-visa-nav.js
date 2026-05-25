/**
 * Remove visa navigation, footer links, and index CTAs from public HTML.
 * Preserves payment brand: images/visa-icon.svg
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const htmlFiles = fs
  .readdirSync(root)
  .filter((f) => f.endsWith('.html'))
  .map((f) => path.join(root, f));

function cleanHtml(content, filePath) {
  let h = content;
  const name = path.basename(filePath);

  // Home submenu: Visa Agency
  h = h.replace(
    /\s*<li><a href="(?:\.\/pages\/)?visa-agency\.html">Visa Agency<\/a><\/li>\s*/g,
    '\n'
  );

  // Main navbar Visa dropdown (20 or 24 space indent)
  h = h.replace(
    /\s*<li class="menu-item-has-children">\s*<a href="(?:\.\/pages\/)?visa\.html" class="drop-down">[\s\S]*?<\/ul>\s*<\/li>\s*/g,
    '\n'
  );

  // Footer Resources: Visa Processing
  h = h.replace(
    /\s*<li><a href="(?:\.\/pages\/)?visa\.html">Visa Processing<\/a><\/li>\s*/g,
    '\n'
  );

  if (name === 'index.html') {
    // Hero filter tab: Visa
    h = h.replace(
      /\s*<li class="single-item visa">[\s\S]*?<span>Visa<\/span>\s*<\/li>\s*/g,
      '\n'
    );

    // Visa search form only (Visa Category label — not hotel form)
    h = h.replace(
      /\s*<form class="filter-input two">[\s\S]*?Visa Category[\s\S]*?<\/form>\s*/g,
      '\n'
    );

    // Services CTA: Visa Processing column
    h = h.replace(
      /\s*<div class="col">\s*<div class="single-service">\s*<a href="visa\.html">[\s\S]*?Visa <br> Processing\s*<\/a>\s*<\/div>\s*<\/div>\s*/g,
      '\n'
    );
  }

  return h;
}

let changed = [];
for (const file of htmlFiles) {
  const before = fs.readFileSync(file, 'utf8');
  const after = cleanHtml(before, file);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed.push(path.basename(file));
  }
}

console.log('Updated', changed.length, 'files:');
changed.forEach((f) => console.log(' -', f));

// Verify no visa page hrefs remain (except visa-icon.svg)
const remaining = [];
for (const file of htmlFiles) {
  const h = fs.readFileSync(file, 'utf8');
  const bad = [
    ...h.matchAll(/href="[^"]*visa(?:-agency|-details)?\.html"/gi),
  ].map((m) => m[0]);
  if (bad.length) remaining.push({ file: path.basename(file), bad });
}
if (remaining.length) {
  console.log('\nRemaining visa page hrefs:');
  remaining.forEach((r) => console.log(r.file, r.bad));
} else {
  console.log('\nNo visa page hrefs remain.');
}

const iconCount = htmlFiles.filter((f) =>
  fs.readFileSync(f, 'utf8').includes('visa-icon.svg')
).length;
console.log('Payment visa-icon.svg preserved in', iconCount, 'files');
