const fs = require('fs');

const content = fs.readFileSync('./lib/tmdb/mockData.ts', 'utf8');

const regex = /id:\s*(\d+),[\s\S]*?title:\s*"([^"]+)",[\s\S]*?poster_path:\s*"([^"]+)",[\s\S]*?backdrop_path:\s*"([^"]+)",[\s\S]*?release_date:\s*"([^"]+)"/g;

let m;
const items = [];
while ((m = regex.exec(content)) !== null) {
  items.push({
    id: parseInt(m[1]),
    title: m[2],
    poster: m[3],
    backdrop: m[4],
    date: m[5]
  });
}

console.log('Found:', items.length);
const newUpcoming = items.filter(x => x.date >= '2024-01-01');
newUpcoming.sort((a, b) => b.date.localeCompare(a.date));
console.log('New & Upcoming (>= 2024):', newUpcoming.length);
console.log(JSON.stringify(newUpcoming.slice(0, 20), null, 2));
