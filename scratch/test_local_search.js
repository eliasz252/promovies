async function test() {
  const r1 = await fetch('http://localhost:3000/api/tmdb/search/multi?query=the%20light%20room');
  if (r1.ok) {
    const d1 = await r1.json();
    console.log('Query "the light room": count =', d1.results?.length);
    console.log('Titles:', d1.results?.slice(0, 5).map(x => `${x.title} (${(x.release_date || '').slice(0,4)})`));
  } else {
    console.log('r1 status:', r1.status);
  }

  const r2 = await fetch('http://localhost:3000/api/tmdb/search/multi?query=interstellar');
  if (r2.ok) {
    const d2 = await r2.json();
    console.log('Query "interstellar": count =', d2.results?.length);
    console.log('Titles:', d2.results?.slice(0, 5).map(x => `${x.title} (${(x.release_date || '').slice(0,4)})`));
  }
}
test().catch(console.error);
