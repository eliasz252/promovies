const fs = require('fs');
const path = 'C:\\Users\\elias\\.gemini\\antigravity-ide\\brain\\c123d99a-4861-4554-a09f-a1d93c639d4d\\.system_generated\\steps\\213\\content.md';
const content = fs.readFileSync(path, 'utf8');

function findSnippet(keyword, len = 1000) {
  const idx = content.indexOf(keyword);
  if (idx === -1) return null;
  return content.slice(idx, idx + len);
}

const res = {
  renderHome: findSnippet('function renderHomeSections'),
  renderMovie: findSnippet('function renderMovieSections'),
};

fs.writeFileSync('./scratch/extracted_logic.txt', JSON.stringify(res, null, 2));
console.log('Saved to ./scratch/extracted_logic.txt');
