const fs = require('fs');
const path = 'C:\\Users\\elias\\.gemini\\antigravity-ide\\brain\\c123d99a-4861-4554-a09f-a1d93c639d4d\\.system_generated\\steps\\213\\content.md';
const content = fs.readFileSync(path, 'utf8');

// Find all h2, h3, section titles, row titles, carousel titles
const titleRegex = /<(?:h1|h2|h3|h4|span|div)[^>]*class=["'][^"']*(?:row-title|section-title|title|header)[^"']*["'][^>]*>([^<]+)<\//gi;
let m;
const titles = [];
while ((m = titleRegex.exec(content)) !== null) {
  titles.push(m[1].trim());
}
console.log('Titles found:', [...new Set(titles)].slice(0, 40));

// Find all static movie items or cards rendered in the HTML
const imgRegex = /<img[^>]+alt=["']([^"']+)["'][^>]*>/gi;
const altList = [];
while ((m = imgRegex.exec(content)) !== null) {
  if (m[1] && m[1].length > 2 && !m[1].includes('icon') && !m[1].includes('logo')) {
    altList.push(m[1].trim());
  }
}
console.log('Movie alts found (sample 30):', [...new Set(altList)].slice(0, 30));

// Check JavaScript functions that fetch rows
const fnRegex = /function\s+([a-zA-Z0-9_]+)\s*\([^)]*\)\s*\{/g;
const fns = [];
while ((m = fnRegex.exec(content)) !== null) {
  fns.push(m[1]);
}
console.log('Functions found:', fns);
