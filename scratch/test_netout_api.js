async function testFetch() {
  const urls = [
    'https://netout.pages.dev/movies/hollywood.json',
    'https://netout.pages.dev/movies/bollywood.json',
    'https://db.wecollege.net/3/movie/upcoming?language=en-US&page=1&region=US',
    'https://db.wecollege.net/3/trending/movie/week',
    'https://db.wecollege.net/3/movie/now_playing?language=en-US&page=1'
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url);
      console.log(`URL: ${url} -> status ${res.status}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          console.log(`  Array of ${data.length} items. Sample item:`, JSON.stringify(data[0]).slice(0, 150));
        } else if (data.results) {
          console.log(`  Results count: ${data.results.length}. Top 3 titles:`, data.results.slice(0, 3).map(x => x.title || x.name));
        } else {
          console.log('  Keys:', Object.keys(data));
        }
      }
    } catch (err) {
      console.log(`URL: ${url} -> error:`, err.message);
    }
  }
}

testFetch();
