const fs = require('fs');
const movies = JSON.parse(fs.readFileSync('./scratch/netout_imported_movies.json', 'utf8'));

const targets = [1284041, 1202033, 1318447, 875828, 812583, 533533];
targets.forEach(id => {
  const m = movies.find(x => x.id === id);
  if (m) {
    console.log(m.id, m.title, m.release_date, m.poster_path, m.vote_average);
  }
});
