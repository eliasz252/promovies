async function test() {
  const query = 'the light room';
  const stopWords = new Set(['the', 'a', 'an', 'of', 'in', 'and', 'or', 'to', 'for', 'with', 'on', 'at', 'from', 'by']);
  const words = query.toLowerCase().split(/\s+/).filter(w => !stopWords.has(w) && w.length > 1);
  console.log('Significant words:', words);

  const cleanQuery = words.join(' ');
  const r1 = await fetch('https://db.wecollege.net/3/search/multi?query=' + encodeURIComponent(cleanQuery));
  if (r1.ok) {
    const d1 = await r1.json();
    console.log(`Search for "${cleanQuery}": found`, d1.results?.length, d1.results?.slice(0, 5).map(x => (x.title || x.name) + ' (' + (x.release_date || x.first_air_date || '').slice(0,4) + ')'));
  }

  for (const word of words) {
    const r2 = await fetch('https://db.wecollege.net/3/search/multi?query=' + encodeURIComponent(word));
    if (r2.ok) {
      const d2 = await r2.json();
      console.log(`Search for "${word}": found`, d2.results?.length, d2.results?.slice(0, 3).map(x => (x.title || x.name) + ' (' + (x.release_date || x.first_air_date || '').slice(0,4) + ')'));
    }
  }
}
test().catch(console.error);
