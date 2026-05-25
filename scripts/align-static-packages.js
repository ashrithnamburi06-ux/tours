const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const INDEX_REPLACEMENTS = [
  // 1
  { search: 'Maldives Beach Paradise', replace: 'Goa Beach Escape' },
  { search: 'a href="travel-package-02.html">Maldives</a>', replace: 'a href="travel-package-02.html">Goa</a>' },
  { search: '<span>05 Days</span>', replace: '<span>04 Days</span>' },
  // 2
  { search: 'Bali Paradise Tour', replace: 'Kerala Backwaters & Houseboat Cruise' },
  { search: 'a href="travel-package-02.html">Bali, Indonesia</a>', replace: 'a href="travel-package-02.html">Kerala</a>' },
  { search: '<span>07 Days</span>', replace: '<span>05 Days</span>' },
  // 3
  { search: 'Phuket &amp; Krabi Island', replace: 'Kashmir Paradise & Shikara Luxury' },
  { search: 'Phuket & Krabi Island', replace: 'Kashmir Paradise & Shikara Luxury' },
  { search: 'a href="travel-package-02.html">Thailand</a>', replace: 'a href="travel-package-02.html">Kashmir</a>' },
  { search: '<span>06 Days</span>', replace: '<span>06 Days</span>' },
  // 4
  { search: 'Rome, Florence &amp; Venice', replace: 'Heritage Golden Triangle Tour' },
  { search: 'Rome, Florence & Venice', replace: 'Heritage Golden Triangle Tour' },
  { search: 'a href="travel-package-02.html">Italy</a>', replace: 'a href="travel-package-02.html">Rajasthan</a>' },
  // 5
  { search: 'Mysore &amp; Nile Cruise Adventure', replace: 'Rajasthan Heritage & Desert Safari' },
  { search: 'Mysore & Nile Cruise Adventure', replace: 'Rajasthan Heritage & Desert Safari' },
  { search: 'a href="travel-package-02.html">Egypt</a>', replace: 'a href="travel-package-02.html">Rajasthan</a>' },
  // 6
  { search: 'Norway Northern Lights', replace: 'Andaman Exotic Honeymoon Escape' },
  { search: 'a href="travel-package-02.html">Norway</a>', replace: 'a href="travel-package-02.html">Andaman</a>' },
  // 7
  { search: 'Vatican &amp; Christian Heritage', replace: 'Hyderabad Heritage & Nizami Cuisine Tour' },
  { search: 'Vatican & Christian Heritage', replace: 'Hyderabad Heritage & Nizami Cuisine Tour' },
  { search: 'a href="travel-package-02.html">Vatican City</a>', replace: 'a href="travel-package-02.html">Hyderabad</a>' },
  // 8
  { search: 'Dubai Ultra-Luxury Experience', replace: 'South India Temple Tour' },
  { search: 'a href="travel-package-02.html">Dubai</a>', replace: 'a href="travel-package-02.html">Tirupati</a>' }
];

const PACKAGE2_REPLACEMENTS = [
  { search: 'Kashmir &amp; Ile-de-Kashmir', replace: 'Goa Beach Escape' },
  { search: 'Kashmir & Ile-de-Kashmir', replace: 'Goa Beach Escape' },
  { search: 'Kashmir &amp; Ile-de-France', replace: 'Goa Beach Escape' },
  { search: 'Kashmir & Ile-de-France', replace: 'Goa Beach Escape' },
  { search: 'Loire Valley &amp; Castles', replace: 'Kerala Backwaters & Houseboat Cruise' },
  { search: 'Loire Valley & Castles', replace: 'Kerala Backwaters & Houseboat Cruise' },
  { search: 'The Grand French Escapade', replace: 'Kashmir Paradise & Shikara Luxury' },
  { search: 'A Magical City Adventure', replace: 'Heritage Golden Triangle Tour' },
  { search: 'The French Alps Adventure', replace: 'Rajasthan Heritage & Desert Safari' },
  { search: 'Cycling The Loire', replace: 'Andaman Exotic Honeymoon Escape' }
];

function alignFile(filePath, replacements) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  replacements.forEach(rep => {
    // Escape regex characters
    const escapedSearch = rep.search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(escapedSearch, 'g');
    content = content.replace(regex, rep.replace);
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`✓ Aligned static packages in ${path.basename(filePath)}`);
  }
}

function run() {
  alignFile(path.join(ROOT_DIR, 'index.html'), INDEX_REPLACEMENTS);
  alignFile(path.join(ROOT_DIR, 'travel-agency-01.html'), INDEX_REPLACEMENTS);
  alignFile(path.join(ROOT_DIR, 'travel-package-02.html'), PACKAGE2_REPLACEMENTS);
}

run();
