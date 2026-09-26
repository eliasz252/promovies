const fs = require('fs');

const path = 'C:\\Users\\elias\\.gemini\\antigravity-ide\\brain\\c123d99a-4861-4554-a09f-a1d93c639d4d\\.system_generated\\steps\\213\\content.md';
const content = fs.readFileSync(path, 'utf8');

// Find all tmdbFetch or fetch or API URLs
const matches = content.match(/tmdbFetch\(['"`]([^'"`]+)['"`]\)/g) || [];
console.log('tmdbFetch calls:', [...new Set(matches)]);

const fetchMatches = content.match(/fetch\(['"`]([^'"`]+)['"`]\)/g) || [];
console.log('fetch calls:', [...new Set(fetchMatches)].slice(0, 20));

// Search for script tags containing endpoints
const scriptRegex = /<script[\s\S]*?<\/script>/gi;
let sm;
const endpoints = new Set();
while ((sm = scriptRegex.exec(content)) !== null) {
  const s = sm[0];
  const urlMatches = s.match(/(?:\/movie|\/tv|\/trending|\/discover|\/search)[^'"`\s\)\$]+/g);
  if (urlMatches) {
    urlMatches.forEach(u => endpoints.add(u));
  }
}
console.log('Endpoints found in scripts:', [...endpoints]);
