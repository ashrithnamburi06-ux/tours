const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const INDIAN_DESTINATIONS = [
  'Goa', 'Kerala', 'Kashmir', 'Rajasthan', 'Shimla', 'Manali', 'Munnar', 'Ooty',
  'Ladakh', 'Coorg', 'Andaman', 'Hyderabad', 'Tirupati', 'Mysore'
];

const INDIAN_PACKAGES = [
  'Goa Beach Escape', 'Kerala Backwaters', 'Kashmir Paradise', 'Golden Triangle Tour',
  'Rajasthan Heritage Tour', 'Andaman Honeymoon', 'Hyderabad Explorer', 'South India Temple Tour'
];

// Curated 4-column mega menu for Destination dropdown
const NEW_DEST_MEGA_MENU = `
                        <li class="menu-item-has-children position-inherit">
                            <a href="destination-01.html" class="drop-down">
                                Destination
                                <i class="bi bi-caret-down-fill"></i>
                            </a>
                            <i class="bi bi-plus dropdown-icon"></i>
                            <div class="mega-menu">
                                <div class="container">
                                    <div class="menu-row">
                                        <div class="menu-single-item">
                                            <div class="menu-title">
                                                <h5>Popular Gateways</h5>
                                            </div>
                                            <i class="bi bi-plus dropdown-icon"></i>
                                            <ul>
                                                <li>
                                                    <a href="destination-details.html?slug=goa">
                                                        <img src="images/india-flag.png" alt="">
                                                        Goa
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="destination-details.html?slug=kerala">
                                                        <img src="images/india-flag.png" alt="">
                                                        Kerala
                                                     </a>
                                                </li>
                                                <li>
                                                    <a href="destination-details.html?slug=kashmir">
                                                        <img src="images/india-flag.png" alt="">
                                                        Kashmir
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="destination-details.html?slug=rajasthan">
                                                        <img src="images/india-flag.png" alt="">
                                                        Rajasthan
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="menu-single-item">
                                            <div class="menu-title">
                                                <h5>Hill Stations</h5>
                                            </div>
                                            <i class="bi bi-plus dropdown-icon"></i>
                                            <ul>
                                                <li>
                                                    <a href="destination-details.html?slug=shimla">
                                                        <img src="images/india-flag.png" alt="">
                                                        Shimla
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="destination-details.html?slug=manali">
                                                        <img src="images/india-flag.png" alt="">
                                                        Manali
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="destination-details.html?slug=munnar">
                                                        <img src="images/india-flag.png" alt="">
                                                        Munnar
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="destination-details.html?slug=ooty">
                                                        <img src="images/india-flag.png" alt="">
                                                        Ooty
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="menu-single-item">
                                            <div class="menu-title">
                                                <h5>Exotic &amp; Heritage</h5>
                                            </div>
                                            <i class="bi bi-plus dropdown-icon"></i>
                                            <ul>
                                                <li>
                                                    <a href="destination-details.html?slug=ladakh">
                                                        <img src="images/india-flag.png" alt="">
                                                        Ladakh
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="destination-details.html?slug=coorg">
                                                        <img src="images/india-flag.png" alt="">
                                                        Coorg
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="destination-details.html?slug=andaman">
                                                        <img src="images/india-flag.png" alt="">
                                                        Andaman
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="destination-details.html?slug=mysore">
                                                        <img src="images/india-flag.png" alt="">
                                                        Mysore
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="menu-single-item">
                                            <div class="menu-title">
                                                <h5>Spiritual Centers</h5>
                                            </div>
                                            <i class="bi bi-plus dropdown-icon"></i>
                                            <ul>
                                                <li>
                                                    <a href="destination-details.html?slug=hyderabad">
                                                        <img src="images/india-flag.png" alt="">
                                                        Hyderabad
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="destination-details.html?slug=tirupati">
                                                        <img src="images/india-flag.png" alt="">
                                                        Tirupati
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <img src="images/mega-menu-vector1.svg" alt="" class="vector1">
                                <img src="images/mega-menu-vector2.svg" alt="" class="vector2">
                            </div>
                        </li>`;

// Indian Quick Search HTML block
const NEW_QUICK_SEARCH = `
                                <div class="quick-search">
                                    <ul>
                                        <li>Quick Search :</li>
                                        <li><a href="travel-package-02.html">Goa Beach Escape,</a></li>
                                        <li><a href="travel-package-02.html">Kerala Backwaters,</a></li>
                                        <li><a href="travel-package-02.html">Kashmir Paradise,</a></li>
                                        <li><a href="travel-package-02.html">Golden Triangle Tour,</a></li>
                                        <li><a href="travel-package-02.html">Rajasthan Heritage Tour,</a></li>
                                        <li><a href="travel-package-02.html">Andaman Honeymoon,</a></li>
                                    </ul>
                                </div>`;

// Indian Footer destinations list
const NEW_FOOTER_DESTINATIONS = `
                            <ul class="widget-list">
                                <li><a href="travel-package-02.html">Goa Beach Escape</a></li>
                                <li><a href="travel-package-02.html">Kerala Backwaters</a></li>
                                <li><a href="travel-package-02.html">Kashmir Paradise</a></li>
                                <li><a href="travel-package-02.html">Golden Triangle Tour</a></li>
                                <li><a href="travel-package-02.html">Rajasthan Heritage Tour</a></li>
                                <li><a href="travel-package-02.html">Andaman Honeymoon</a></li>
                                <li><a href="travel-package-02.html">Hyderabad Explorer</a></li>
                                <li><a href="travel-package-02.html">South India Temple Tour</a></li>
                            </ul>`;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const basename = path.basename(filePath);

  // --- 1. Homepage Navbar Alignment (Home dropdown -> single link) ---
  const homeRegex = /<li class="menu-item-has-children(?: active)?">\s*<a href="index.html" class="drop-down">[\s\S]*?Home[\s\S]*?<\/ul>\s*<\/li>/;
  if (homeRegex.test(content)) {
    const isIndex = basename === 'index.html';
    const replacement = isIndex 
      ? '<li class="active"><a href="index.html">Home</a></li>' 
      : '<li><a href="index.html">Home</a></li>';
    content = content.replace(homeRegex, replacement);
  }

  // Also replace simple list items pointing to travel-agency-01
  content = content.replace(/<li><a href="travel-agency-01\.html">Travel Agency-01<\/a><\/li>/g, '');

  // --- 2. Destination Mega Menu Alignment ---
  const destRegex = /<li class="menu-item-has-children position-inherit">[\s\S]*?<a href="destination-01\.html" class="drop-down">[\s\S]*?Destination[\s\S]*?<\/div>\s*<\/li>/;
  if (destRegex.test(content)) {
    content = content.replace(destRegex, NEW_DEST_MEGA_MENU);
  }

  // --- 3. Quick Search suggestions ---
  const quickSearchRegex = /<div class="quick-search">[\s\S]*?<\/ul>\s*<\/div>/;
  if (quickSearchRegex.test(content)) {
    content = content.replace(quickSearchRegex, NEW_QUICK_SEARCH);
  }

  // --- 4. Footer Destinations ---
  const footerDestRegex = /<h5>Top Destination<\/h5>\s*<\/div>\s*<ul class="widget-list">[\s\S]*?<\/ul>/;
  if (footerDestRegex.test(content)) {
    content = content.replace(footerDestRegex, `<h5>Top Destination</h5></div>${NEW_FOOTER_DESTINATIONS}`);
  }

  // --- 5. Footer Popular Search ---
  content = content.replace(/<li><a href="travel-package-02\.html">Bali Vacation Package<\/a><\/li>/g, '<li><a href="travel-package-02.html">Goa Beach Escapes</a></li>');
  content = content.replace(/<li><a href="travel-package-02\.html"> Dubai Luxury Tours<\/a><\/li>/g, '<li><a href="travel-package-02.html">Ladakh Adventure Tour</a></li>');

  // --- 6. Footer Address ---
  content = content.replace(/Skyline Plaza, 5th Floor, 123 Main Street Los Angeles, CA 90001, USA/g, 'Skyline Plaza, 5th Floor, 123 Connaught Place, New Delhi, 110001, India');

  // --- 7. Fix Broken Template Routes (travel-package-01.html does not exist) ---
  content = content.replace(/travel-package-01\.html/g, 'travel-package-02.html');

  // --- 8. Specific Static Fallback Replacements (STEP 2, 3, 4) ---
  // Headings & descriptive text cleanups (Dal Lake / Kashmir replacements)
  content = content.replace(/Paris &amp; Ile-de-Kashmir/g, 'Kashmir Paradise Tour');
  content = content.replace(/Paris & Ile-de-Kashmir/g, 'Kashmir Paradise Tour');
  content = content.replace(/Paris &amp; Ile-de-France/g, 'Kashmir Paradise Tour');
  content = content.replace(/Paris & Ile-de-France/g, 'Kashmir Paradise Tour');
  
  content = content.replace(/Paris, the City of Lights, and the surrounding Ile-de-Kashmir region/g, 'Kashmir, the Heaven on Earth, and the surrounding Srinagar valley');
  content = content.replace(/Paris, the City of Lights, and the surrounding/g, 'Kashmir, the Heaven on Earth, and the surrounding');
  content = content.replace(/Whether you're visiting Paris/g, 'Whether you\'re visiting Kashmir');
  content = content.replace(/Public Transport in Paris/g, 'Local Transport in Srinagar');
  content = content.replace(/Paris Metro \(Subway\)/g, 'Shikara Boat Rides');
  content = content.replace(/Paris Metro/g, 'Shikaras');
  content = content.replace(/The Eiffel Tower is the heart of Paris/g, 'Dal Lake is the heart of Srinagar');
  content = content.replace(/Eiffel Tower/g, 'Dal Lake');
  content = content.replace(/Louvre Museum/g, 'Mughal Gardens');
  content = content.replace(/Louvre/g, 'Mughal Gardens');
  content = content.replace(/Nice \(French Riviera\)/g, 'Alleppey (Kerala Backwaters)');
  content = content.replace(/Bordeaux \(wine tours\)/g, 'Nashik (vineyard tours)');
  content = content.replace(/Provence \(lavender fields\)/g, 'Munnar (tea gardens)');
  content = content.replace(/Normandy \(Mont Saint-Michel\)/g, 'Hampi (historic ruins)');
  content = content.replace(/French Riviera/g, 'Kerala Backwaters');
  content = content.replace(/Htel de Crillon in Paris/g, 'Taj Mahal Palace in Mumbai');
  content = content.replace(/Rosewood London/g, 'Rosewood Kerala');
  content = content.replace(/Las Ventanas al Paraso in Mexico/g, 'Umaid Bhawan Palace in Jodhpur');
  content = content.replace(/Las Ventanas al Paraso in Rajasthan/g, 'Umaid Bhawan Palace in Jodhpur');
  
  // Clean simple labels
  content = content.replace(/Paris, France/g, 'Srinagar, Kashmir');
  content = content.replace(/France/g, 'Kashmir');
  content = content.replace(/United Kingdom/g, 'Kerala');
  content = content.replace(/Netherlands/g, 'Rajasthan');
  content = content.replace(/Italy/g, 'Goa');
  content = content.replace(/Greece/g, 'Ooty');
  content = content.replace(/Romania/g, 'Munnar');
  content = content.replace(/Tokyo, Japan/g, 'Shimla, Himachal Pradesh');
  content = content.replace(/Indonesia/g, 'Coorg');
  content = content.replace(/Thailand/g, 'Ladakh');
  content = content.replace(/Malaysia/g, 'Andaman');
  content = content.replace(/Hanoi, Vietnam/g, 'Tirupati, Andhra Pradesh');
  content = content.replace(/Egypt/g, 'Mysore');
  content = content.replace(/South Africa/g, 'Hyderabad');
  content = content.replace(/United States/g, 'Goa');
  content = content.replace(/Canada/g, 'Kerala');
  content = content.replace(/Mexico/g, 'Rajasthan');
  content = content.replace(/United Arab Emirates/g, 'Ladakh');
  content = content.replace(/Paris Tour/g, 'Kashmir Tour');
  content = content.replace(/Thailand Tour/g, 'Goa Tour');
  content = content.replace(/Bali Tour/g, 'Kerala Tour');
  content = content.replace(/Maldives Tour/g, 'Andaman Tour');
  content = content.replace(/Hawaii, USA Tour/g, 'Rajasthan Tour');
  content = content.replace(/Switzerland Tour/g, 'Golden Triangle Tour');
  
  // Specific catch-all for remaining standalone 'Paris'
  content = content.replace(/\bParis\b/g, 'Kashmir');

  // Guider page fallbacks
  content = content.replace(/Sarah Jenkins/g, 'Amit Sharma');
  content = content.replace(/John Doe/g, 'Rajesh Kumar');
  content = content.replace(/Alice Johnson/g, 'Priya Patel');
  content = content.replace(/Professional Tour Guide/g, 'Experienced Indian Guide');
  content = content.replace(/specialist in European History/g, 'specialist in Rajasthan Heritage');
  content = content.replace(/specialist in Asian Temples/g, 'specialist in South India Temples');

  // FAQ page fallbacks (Domestic themed)
  content = content.replace(/Do I need a passport or visa\?/g, 'Do I need special inner line permits?');
  content = content.replace(/Passports are required for all international travel\./g, 'Inner Line Permits (ILP) are required for areas like Ladakh, Lakshadweep, and parts of the Northeast.');
  content = content.replace(/Which currency should I carry\?/g, 'Are digital payments widely accepted?');
  content = content.replace(/carrying US Dollars or Euros is highly recommended\./g, 'carrying Indian Rupees is recommended, but UPI (GPay, PhonePe) is widely accepted.');

  // Inspiration blogs fallbacks
  content = content.replace(/Romantic Seine River Dinner Cruise/g, 'Serene Kerala Backwater Houseboat Cruise');
  content = content.replace(/A Guide to the Louvre Museum/g, 'Historical Tour of the Taj Mahal');
  content = content.replace(/Cherry Blossoms in Kyoto/g, 'Apple Orchards in Shimla and Manali');
  content = content.replace(/Hiking the Swiss Alps/g, 'Trekking the Majestic Trails of Ladakh');

  // Thomas Cook History block in about.html
  const historyRegex = /The first-ever travel agency was founded by <span>Thomas Cook<\/span>[\s\S]*?especially among the elite\./g;
  if (historyRegex.test(content)) {
    content = content.replace(historyRegex, 'The first-ever domestic travel agency in India was founded to explore the breathtaking beauty of our homeland. Organizing group trips, starting with a railway excursion to majestic hill stations, we expanded our services across the sub-continent, arranging trips to Kashmir, Kerala, Goa and beyond. We introduced the first-ever comprehensive travel brochure, guiding travelers on beautiful Indian destinations & routes.');
  }

  fs.writeFileSync(filePath, content);
  console.log(`✓ Processed & aligned ${basename}`);
}

function run() {
  const files = fs.readdirSync(ROOT_DIR);
  files.forEach(file => {
    if (file.endsWith('.html')) {
      processFile(path.join(ROOT_DIR, file));
    }
  });
  console.log('\nGlobal compliance replacements completed successfully.');
}

run();
