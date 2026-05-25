const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const forbiddenWords = [
  'Paris', 'Tokyo', 'Germany', 'Portugal', 'Europe',
  'Bali', 'Maldives', 'Rome', 'Venice', 'Florence',
  'USA', 'America', 'Nile Cruise', 'Loire Valley', 'French Alps'
];

const filesToCheck = [
  'about.html',
  'destination-04.html',
  'destination-details.html',
  'experience-details.html',
  'experience-grid.html',
  'hotel.html',
  'index.html',
  'travel-agency-01.html',
  'travel-inspiration-01.html',
  'travel-inspiration-details.html',
  'travel-package-02.html',
  'travel-package-details.html',
  'visa.html'
];

filesToCheck.forEach(file => {
  const filePath = path.join(ROOT_DIR, file);
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    forbiddenWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      if (regex.test(line)) {
        console.log(`--- ${file} : Line ${index + 1} (${word}) ---`);
        const start = Math.max(0, index - 2);
        const end = Math.min(lines.length - 1, index + 2);
        for (let l = start; l <= end; l++) {
          console.log(`${l + 1}: ${lines[l].trim()}`);
        }
      }
    });
  });
});
