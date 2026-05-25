const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const replacementsByFile = {
  'about.html': [
    { search: /Maldives/g, replace: 'Goa' }
  ],
  'destination-04.html': [
    { search: /Maldives Beach Paradise/g, replace: 'Goa Beach Escape' },
    { search: /Maldives/g, replace: 'Goa' },
    { search: /Rome, Florence &amp; Venice/g, replace: 'Heritage Golden Triangle Tour' },
    { search: /Rome, Florence & Venice/g, replace: 'Heritage Golden Triangle Tour' },
    { search: /Rome/g, replace: 'Rajasthan' }
  ],
  'destination-details.html': [
    { search: /Maldives Beach Paradise/g, replace: 'Goa Beach Escape' },
    { search: /Maldives/g, replace: 'Goa' },
    { search: /Bali Paradise Tour/g, replace: 'Kerala Backwaters & Houseboat Cruise' },
    { search: /Bali/g, replace: 'Kerala' },
    { search: /Loire Valley/g, replace: 'Kashmir' }
  ],
  'experience-details.html': [
    { search: /Maldives/g, replace: 'Goa' }
  ],
  'experience-grid.html': [
    { search: /Maldives/g, replace: 'Goa' }
  ],
  'hotel.html': [
    { search: /Bali/g, replace: 'Kerala' }
  ],
  'index.html': [
    { search: /Rome/g, replace: 'Rajasthan' }
  ],
  'travel-agency-01.html': [
    { search: /Rome/g, replace: 'Rajasthan' }
  ],
  'travel-inspiration-01.html': [
    { search: /Bali/g, replace: 'Kerala' },
    { search: /Maldives/g, replace: 'Goa' }
  ],
  'travel-inspiration-details.html': [
    { search: /Bali/g, replace: 'Kerala' },
    { search: /Maldives/g, replace: 'Goa' }
  ],
  'travel-package-02.html': [
    { search: /Loire Valley &amp; Central Kashmir/g, replace: 'Kerala Backwaters & Houseboat Cruise' },
    { search: /Loire Valley & Central Kashmir/g, replace: 'Kerala Backwaters & Houseboat Cruise' },
    { search: /Loire Valley/g, replace: 'Kerala' }
  ],
  'travel-package-details.html': [
    { search: /Maldives Group Island Hopping Tour/g, replace: 'Goa Group Island Exploration Tour' },
    { search: /Maldives Beach Paradise/g, replace: 'Goa Beach Escape' },
    { search: /Maldives/g, replace: 'Goa' },
    { search: /Bali Paradise Tour/g, replace: 'Kerala Backwaters & Houseboat Cruise' },
    { search: /Bali/g, replace: 'Kerala' },
    { search: /Rome, Florence &amp; Venice/g, replace: 'Heritage Golden Triangle Tour' },
    { search: /Rome, Florence & Venice/g, replace: 'Heritage Golden Triangle Tour' },
    { search: /Rome/g, replace: 'Rajasthan' },
    { search: /Venice/g, replace: 'Delhi' },
    { search: /Florence/g, replace: 'Agra' },
    { search: /Mysore &amp; Nile Cruise Adventure/g, replace: 'Rajasthan Heritage & Desert Safari' },
    { search: /Mysore & Nile Cruise Adventure/g, replace: 'Rajasthan Heritage & Desert Safari' },
    { search: /Nile Cruise/g, replace: 'Desert Safari' },
    { search: /Loire Valley/g, replace: 'Kashmir' }
  ],
  'visa.html': [
    { search: /Germany/g, replace: 'Sikkim Permit' }
  ]
};

Object.keys(replacementsByFile).forEach(fileName => {
  const filePath = path.join(ROOT_DIR, fileName);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  replacementsByFile[fileName].forEach(r => {
    content = content.replace(r.search, r.replace);
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Cleaned compliance leftovers in ${fileName}`);
  }
});
