async function inspect() {
  const res = await fetch('https://netout.pages.dev/browse');
  const html = await res.text();
  
  // Find all script tags
  const scripts = html.match(/<script[\s\S]*?<\/script>/gi) || [];
  console.log('Total scripts found:', scripts.length);
  
  for (let i = 0; i < scripts.length; i++) {
    const s = scripts[i];
    const srcMatch = s.match(/src=["']([^"']+)["']/i);
    if (srcMatch) {
      console.log(`Script [${i}] src:`, srcMatch[1]);
    } else {
      console.log(`Script [${i}] inline length:`, s.length);
      // Search for API urls, search, endpoints, players
      const urls = s.match(/https?:\/\/[^\s"'`<>]+/g) || [];
      const apiCalls = s.match(/(?:fetch|axios|get|post)\s*\([^)]+\)/g) || [];
      console.log(`  URLs found (${urls.length}):`, [...new Set(urls)].slice(0, 10));
      console.log(`  API calls (${apiCalls.length}):`, [...new Set(apiCalls)].slice(0, 10));
    }
  }

  // Also search for form action or search input
  const searchInputs = html.match(/<input[^>]*search[^>]*>/gi) || [];
  console.log('Search inputs:', searchInputs);

  // Check if there are other pages or API references
  const matches = html.match(/(?:api|search|movie|stream|embed|server|video|vidsrc|superembed|2embed)[a-zA-Z0-9_\-\.\/:]*/gi) || [];
  console.log('Keywords found:', [...new Set(matches.filter(m => m.length > 5))].slice(0, 30));
}

inspect().catch(console.error);
