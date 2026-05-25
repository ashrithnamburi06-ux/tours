const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const titleToSlug = {
  'Goa Beach Escape': 'goa-beach-escape',
  'Kerala Backwaters & Houseboat Cruise': 'kerala-backwaters-houseboat-cruise',
  'Kashmir Paradise & Shikara Luxury': 'kashmir-paradise-shikara-luxury',
  'Heritage Golden Triangle Tour': 'heritage-golden-triangle-tour',
  'Rajasthan Heritage & Desert Safari': 'rajasthan-heritage-desert-safari',
  'Andaman Exotic Honeymoon Escape': 'andaman-exotic-honeymoon-escape',
  'Hyderabad Heritage & Nizami Cuisine Tour': 'hyderabad-heritage-nizami-cuisine-tour',
  'South India Temple Tour': 'south-india-temple-tour',
  'Rome, Florence & Venice': 'heritage-golden-triangle-tour',
  'Mysore & Nile Cruise Adventure': 'rajasthan-heritage-desert-safari',
  'Loire Valley & Castles': 'kerala-backwaters-houseboat-cruise',
  'The Grand French Escapade': 'kashmir-paradise-shikara-luxury',
  'A Magical City Adventure': 'heritage-golden-triangle-tour',
  'The French Alps Adventure': 'rajasthan-heritage-desert-safari',
  'Cycling The Loire': 'andaman-exotic-honeymoon-escape'
};

const LEGACY_ALIGNMENTS = [
  { search: /Rome, Florence &amp; Venice/g, replace: 'Heritage Golden Triangle Tour' },
  { search: /Rome, Florence & Venice/g, replace: 'Heritage Golden Triangle Tour' },
  { search: /Mysore &amp; Nile Cruise Adventure/g, replace: 'Rajasthan Heritage & Desert Safari' },
  { search: /Mysore & Nile Cruise Adventure/g, replace: 'Rajasthan Heritage & Desert Safari' },
  { search: /Loire Valley &amp; Castles/g, replace: 'Kerala Backwaters & Houseboat Cruise' },
  { search: /Loire Valley & Castles/g, replace: 'Kerala Backwaters & Houseboat Cruise' },
  { search: /The Grand French Escapade/g, replace: 'Kashmir Paradise & Shikara Luxury' },
  { search: /A Magical City Adventure/g, replace: 'Heritage Golden Triangle Tour' },
  { search: /The French Alps Adventure/g, replace: 'Rajasthan Heritage & Desert Safari' },
  { search: /Cycling The Loire/g, replace: 'Andaman Exotic Honeymoon Escape' }
];

const filesToProcess = [
  'index.html',
  'travel-agency-01.html',
  'travel-package-02.html',
  'destination-details.html'
];

filesToProcess.forEach(fileName => {
  const filePath = path.join(ROOT_DIR, fileName);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Apply legacy alignments first
  LEGACY_ALIGNMENTS.forEach(la => {
    content = content.replace(la.search, la.replace);
  });

  // Now, split by package card class start
  // Split using a regex that matches the class prefix for package cards
  const blocks = content.split(/<div class="package-card/g);
  let modified = false;

  for (let i = 1; i < blocks.length; i++) {
    let block = blocks[i];
    
    // Extract title
    // Look for h5 anchor
    const titleMatch = block.match(/<h5>\s*<a[^>]*>\s*([\s\S]*?)\s*<\/a>\s*<\/h5>/i);
    if (titleMatch) {
      let title = titleMatch[1].replace(/&amp;/g, '&').trim();
      // Remove html tags if any
      title = title.replace(/<[^>]*>/g, '').trim();

      const slug = titleToSlug[title];
      if (slug) {
        // Find Book Now buttons in this block and replace travel-package-details.html with checkout.html?package={slug}
        // First look for any anchor containing "Book Now"
        const bookNowRegex = /(<a\s+href=")(travel-package-details\.html)("[^>]*class="[^"]*primary-btn1[^"]*"[^>]*>[\s\S]*?Book\s+Now)/gi;
        if (bookNowRegex.test(block)) {
          block = block.replace(bookNowRegex, `$1checkout.html?package=${slug}$3`);
          blocks[i] = block;
          modified = true;
          console.log(`Mapped Book Now in ${fileName} for package: "${title}" -> ${slug}`);
        } else {
          // Fallback search for any travel-package-details.html in the block that is a button
          const generalBtnRegex = /(<a\s+href=")(travel-package-details\.html)("[^>]*class="[^"]*(?:primary-btn1|map-view-btn)[^"]*"[^>]*>)/gi;
          if (generalBtnRegex.test(block)) {
            // Check if Book Now is in the button body
            block = block.replace(generalBtnRegex, (match, p1, p2, p3) => {
              if (block.toLowerCase().includes('book now')) {
                return `${p1}checkout.html?package=${slug}${p3}`;
              }
              return match;
            });
            blocks[i] = block;
            modified = true;
            console.log(`Mapped general button in ${fileName} for package: "${title}" -> ${slug}`);
          }
        }
      }
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, blocks.join('<div class="package-card'), 'utf8');
    console.log(`✓ Updated booking flows in ${fileName}`);
  }
});
