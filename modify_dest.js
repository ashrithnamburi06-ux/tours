const fs = require('fs');
let content = fs.readFileSync('destination-details.html', 'utf8');

content = content.replace('id="pkg-banner-content"', 'id="dest-banner-content"');
content = content.replace('id="pkg-price-badge"', 'id="dest-price-badge"');
content = content.replace('id="pkg-main-title"', 'id="dest-main-title"');
content = content.replace('id="pkg-meta-badge"', 'id="dest-meta-badge"');
content = content.replace('<span>Starting From <strong id="pkg-price-badge">$899</strong>/per person</span>', '');

content = content.replace('id="pkg-overview-wrap"', 'id="dest-overview-wrap"');
content = content.replace('<h4>About Tour Package</h4>', '<h4>About Destination</h4>');
content = content.replace('id="pkg-overview"', 'id="dest-overview"');
content = content.replace('id="pkg-highlights-list"', 'id="dest-highlights-list"');

content = content.replace('<div class="highlights-tour-area mb-60">', '<div class="highlights-tour-area mb-60" id="dest-attractions-wrap">');
content = content.replace('<h4>Highlights of the Tour</h4>', '<h4>Top Attractions</h4>');

content = content.replace('<h4>Frequently Asked & Question</h4>', '<h4>Best Time To Visit</h4>');

content = content.replace(/<div class="tour-itinerary-area mb-60" id="pkg-itinerary-wrap">[\s\S]*?(?=<div class="faq-area mb-60">)/, '');

content = content.replace(/<div class="pricing-and-booking-area mb-40">[\s\S]*?(?=<div class="customize-package-banner-wrap">)/, '');
content = content.replace(/<div class="customize-package-banner-wrap">[\s\S]*?(?=<div class="inquiry-area mb-40">)/, '');

content = content.replace('id="pkg-related-slider"', 'id="dest-related-packages-slider"');
content = content.replace('Related Package', 'Available Packages');

fs.writeFileSync('destination-details.html', content);
console.log("Replacements done successfully");
