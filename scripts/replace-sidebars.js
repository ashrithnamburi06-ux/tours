const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

function run() {
  const package2Path = path.join(ROOT_DIR, 'travel-package-02.html');
  if (!fs.existsSync(package2Path)) {
    console.error('travel-package-02.html not found!');
    return;
  }

  const p2Content = fs.readFileSync(package2Path, 'utf8');
  
  // Regex to extract the sidebar block
  const sidebarRegex = /<div class="package-sidebar-area">[\s\S]*?(?=\s*<div class="col-lg-8">)/;
  const match = p2Content.match(sidebarRegex);
  
  if (!match) {
    console.error('Could not find sidebar block in travel-package-02.html!');
    return;
  }

  const sidebarHtml = match[0];
  console.log('Successfully extracted compliant sidebar from travel-package-02.html.');

  const targetFiles = [
    'index.html',
    'travel-agency-01.html',
    'experience-grid.html'
  ];

  targetFiles.forEach(fileName => {
    const filePath = path.join(ROOT_DIR, fileName);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    content = content.replace(sidebarRegex, sidebarHtml);

    if (content !== original) {
      fs.writeFileSync(filePath, content);
      console.log(`✓ Synchronized compliant sidebar in ${fileName}`);
    }
  });
}

run();
