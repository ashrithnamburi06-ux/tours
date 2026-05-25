const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const CLEAN_DESTINATIONS_FILTER = `<ul id="destinations-filter-list">
                                        <li>
                                            <label class="containerss">
                                                <input type="checkbox" value="goa" class="filter-checkbox" data-filter-type="destination">
                                                <span class="checkmark"></span>
                                                <strong><span>Goa</span></strong>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="containerss">
                                                <input type="checkbox" value="kerala" class="filter-checkbox" data-filter-type="destination">
                                                <span class="checkmark"></span>
                                                <strong><span>Kerala</span></strong>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="containerss">
                                                <input type="checkbox" value="kashmir" class="filter-checkbox" data-filter-type="destination">
                                                <span class="checkmark"></span>
                                                <strong><span>Kashmir</span></strong>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="containerss">
                                                <input type="checkbox" value="rajasthan" class="filter-checkbox" data-filter-type="destination">
                                                <span class="checkmark"></span>
                                                <strong><span>Rajasthan</span></strong>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="containerss">
                                                <input type="checkbox" value="shimla" class="filter-checkbox" data-filter-type="destination">
                                                <span class="checkmark"></span>
                                                <strong><span>Shimla</span></strong>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="containerss">
                                                <input type="checkbox" value="manali" class="filter-checkbox" data-filter-type="destination">
                                                <span class="checkmark"></span>
                                                <strong><span>Manali</span></strong>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="containerss">
                                                <input type="checkbox" value="ooty" class="filter-checkbox" data-filter-type="destination">
                                                <span class="checkmark"></span>
                                                <strong><span>Ooty</span></strong>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="containerss">
                                                <input type="checkbox" value="munnar" class="filter-checkbox" data-filter-type="destination">
                                                <span class="checkmark"></span>
                                                <strong><span>Munnar</span></strong>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="containerss">
                                                <input type="checkbox" value="ladakh" class="filter-checkbox" data-filter-type="destination">
                                                <span class="checkmark"></span>
                                                <strong><span>Ladakh</span></strong>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="containerss">
                                                <input type="checkbox" value="coorg" class="filter-checkbox" data-filter-type="destination">
                                                <span class="checkmark"></span>
                                                <strong><span>Coorg</span></strong>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="containerss">
                                                <input type="checkbox" value="andaman" class="filter-checkbox" data-filter-type="destination">
                                                <span class="checkmark"></span>
                                                <strong><span>Andaman</span></strong>
                                            </label>
                                        </li>
                                        <li>
                                            <label class="containerss">
                                                <input type="checkbox" value="hyderabad" class="filter-checkbox" data-filter-type="destination">
                                                <span class="checkmark"></span>
                                                <strong><span>Hyderabad</span></strong>
                                            </label>
                                        </li>
                                    </ul>`;

const CLEAN_CATEGORIES_FILTER = `<ul class="tour-type" id="categories-filter-list">
                                    <li>
                                        <label class="containerss">
                                            <input type="checkbox" value="adventure-tour" class="filter-checkbox" data-filter-type="category">
                                            <span class="checkmark"></span>
                                            <strong><span>Adventure Tour</span></strong>
                                        </label>
                                    </li>
                                    <li>
                                        <label class="containerss">
                                            <input type="checkbox" value="beach-escape" class="filter-checkbox" data-filter-type="category">
                                            <span class="checkmark"></span>
                                            <strong><span>Beach Escape</span></strong>
                                        </label>
                                    </li>
                                    <li>
                                        <label class="containerss">
                                            <input type="checkbox" value="mountain-holiday" class="filter-checkbox" data-filter-type="category">
                                            <span class="checkmark"></span>
                                            <strong><span>Mountain Holiday</span></strong>
                                        </label>
                                    </li>
                                    <li>
                                        <label class="containerss">
                                            <input type="checkbox" value="heritage-tour" class="filter-checkbox" data-filter-type="category">
                                            <span class="checkmark"></span>
                                            <strong><span>Heritage Tour</span></strong>
                                        </label>
                                    </li>
                                    <li>
                                        <label class="containerss">
                                            <input type="checkbox" value="spiritual-circuit" class="filter-checkbox" data-filter-type="category">
                                            <span class="checkmark"></span>
                                            <strong><span>Spiritual Circuit</span></strong>
                                        </label>
                                    </li>
                                    <li>
                                        <label class="containerss">
                                            <input type="checkbox" value="honeymoon-special" class="filter-checkbox" data-filter-type="category">
                                            <span class="checkmark"></span>
                                            <strong><span>Honeymoon Special</span></strong>
                                        </label>
                                    </li>
                                </ul>`;

function alignFilters(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace destinations filter list
  const destRegex = /<ul id="destinations-filter-list">[\s\S]*?<\/ul>/;
  if (destRegex.test(content)) {
    content = content.replace(destRegex, CLEAN_DESTINATIONS_FILTER);
  }

  // Replace categories filter list
  const catRegex = /<ul class="tour-type" id="categories-filter-list">[\s\S]*?<\/ul>/;
  if (catRegex.test(content)) {
    content = content.replace(catRegex, CLEAN_CATEGORIES_FILTER);
  }

  // Replace remaining specific mentions in other sidebars or widgets
  content = content.replace(/<li>\s*<a href="hotel\.html">Portugal<\/a>\s*<\/li>/g, '');
  content = content.replace(/<a href="hotel\.html">Portugal<\/a>/g, '<a href="hotel.html">Goa</a>');

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`✓ Aligned filters in ${path.basename(filePath)}`);
  }
}

function run() {
  const files = fs.readdirSync(ROOT_DIR);
  files.forEach(file => {
    if (file.endsWith('.html')) {
      alignFilters(path.join(ROOT_DIR, file));
    }
  });
}

run();
