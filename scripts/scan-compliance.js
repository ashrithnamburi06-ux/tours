const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const forbiddenWords = [
  'Paris',
  'Tokyo',
  'Germany',
  'Portugal',
  'Europe',
  'Bali',
  'Maldives',
  'Rome',
  'Venice',
  'Florence',
  'USA',
  'America',
  'Nile Cruise',
  'Loire Valley',
  'French Alps'
];

fs.readdir(ROOT_DIR, (err, files) => {
  if (err) return console.error(err);

  files.forEach(file => {
    if (path.extname(file) === '.html') {
      const filePath = path.join(ROOT_DIR, file);
      const content = fs.readFileSync(filePath, 'utf8');

      forbiddenWords.forEach(word => {
        // Use word boundary to avoid false positives if possible, but let's check exact substring case-insensitive
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        const matches = content.match(regex);
        if (matches) {
          console.log(`[NON-COMPLIANT] Found "${word}" in ${file} (${matches.length} occurrences)`);
        }
      });
    }
  });
});
