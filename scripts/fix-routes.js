const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '..');

const replacements = [
  { search: /destination-01\.html/g, replace: 'destination-04.html' },
  { search: /destination-02\.html/g, replace: 'destination-04.html' },
  { search: /destination-03\.html/g, replace: 'destination-04.html' },
  { search: /destination-05\.html/g, replace: 'destination-04.html' },
  { search: /destination-06\.html/g, replace: 'destination-04.html' },
  { search: /travel-inspiration-02\.html/g, replace: 'travel-inspiration-01.html' },
  { search: /travel-inspiration-03\.html/g, replace: 'travel-inspiration-01.html' },
  { search: /travel-package-01\.html/g, replace: 'travel-package-02.html' }
];

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  
  files.forEach(file => {
    if (path.extname(file) === '.html') {
      const filePath = path.join(directoryPath, file);
      let content = fs.readFileSync(filePath, 'utf8');
      let modified = false;

      replacements.forEach(r => {
        if (r.search.test(content)) {
          content = content.replace(r.search, r.replace);
          modified = true;
        }
      });

      if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated routes in ${file}`);
      }
    }
  });
});
