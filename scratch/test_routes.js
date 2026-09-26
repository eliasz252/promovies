const routes = [
  '/',
  '/movies',
  '/shows',
  '/anime',
  '/new-and-popular',
  '/my-list',
  '/profiles',
  '/search?q=spider',
  '/genre/28',
  '/genre/878',
  '/language/en',
  '/title/movie/1294819',
  '/title/tv/108978',
  '/api/catalog',
  '/api/tmdb/search/multi?query=batman',
  '/sitemap.xml',
  '/robots.txt',
];

async function runTests() {
  console.log('Testing ' + routes.length + ' routes on http://localhost:3000...\n');
  let errors = 0;

  for (const route of routes) {
    const url = 'http://localhost:3000' + route;
    try {
      const res = await fetch(url);
      const text = await res.text();
      const isError = res.status >= 400 || text.includes('Signal Interruption') || text.includes('Application error: a client-side exception');
      
      if (isError) {
        console.error(`❌ [FAIL] ${route} -> Status: ${res.status}, Error text found: ${text.includes('Signal Interruption') ? 'Signal Interruption' : 'HTTP error'}`);
        errors++;
      } else {
        console.log(`✅ [PASS] ${route} -> Status: ${res.status}, Length: ${text.length}`);
      }
    } catch (err) {
      console.error(`❌ [ERR]  ${route} -> ${err.message}`);
      errors++;
    }
  }

  console.log(`\nFinished test run: ${routes.length - errors}/${routes.length} passed.`);
}

runTests();
