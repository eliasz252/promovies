const fs = require('fs');
const path = 'C:\\Users\\elias\\.gemini\\antigravity-ide\\brain\\c123d99a-4861-4554-a09f-a1d93c639d4d\\.system_generated\\steps\\213\\content.md';
const content = fs.readFileSync(path, 'utf8');

const idx = content.indexOf('function renderHomeSections');
if (idx !== -1) {
  const slice = content.slice(idx, idx + 4000);
  fs.writeFileSync('./scratch/home_sections_full.txt', slice);
  console.log('Saved 4000 chars of renderHomeSections');
}
