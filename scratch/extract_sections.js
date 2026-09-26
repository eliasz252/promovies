const fs = require('fs');
const path = 'C:\\Users\\elias\\.gemini\\antigravity-ide\\brain\\c123d99a-4861-4554-a09f-a1d93c639d4d\\.system_generated\\steps\\213\\content.md';
const content = fs.readFileSync(path, 'utf8');

function extractFunction(name) {
  const idx = content.indexOf(`function ${name}`);
  if (idx === -1) return `Function ${name} not found`;
  return content.slice(idx, idx + 2500);
}

console.log('--- renderHomeSections ---');
console.log(extractFunction('renderHomeSections'));

console.log('--- renderMovieSections ---');
console.log(extractFunction('renderMovieSections'));
