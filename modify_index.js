const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const indianSlugs = ['goa', 'kerala', 'rajasthan', 'kashmir', 'himachal-pradesh', 'ooty', 'andaman'];
let i = 0;
content = content.replace(/href="destination-details\.html"/g, () => {
    const slug = indianSlugs[i % indianSlugs.length];
    i++;
    return `href="destination-details.html?slug=${slug}"`;
});

fs.writeFileSync('index.html', content);
console.log('Updated index.html destinations');
