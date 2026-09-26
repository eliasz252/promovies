async function dumpScripts() {
  const res = await fetch('https://netout.pages.dev/browse');
  const html = await res.text();
  const scripts = html.match(/<script[\s\S]*?<\/script>/gi) || [];
  
  console.log('--- SCRIPT 1 ---');
  console.log(scripts[1]);

  console.log('--- SEARCH SCRIPT (finding script with tmdb-search or search-input) ---');
  for (const s of scripts) {
    if (s.includes('tmdb-search') || s.includes('search-input') || s.includes('search/multi')) {
      console.log('MATCH:', s.slice(0, 1500));
    }
  }

  // Also check streaming servers / player in all scripts
  console.log('--- STREAMING / PLAYER SERVERS ---');
  for (const s of scripts) {
    if (s.includes('embed') || s.includes('player') || s.includes('server') || s.includes('iframe') || s.includes('vidsrc')) {
      const serverMatches = s.match(/https?:\/\/[^\s"'`]+\/(?:embed|v|e|movie|tv)[^\s"'`]*/g) || [];
      if (serverMatches.length) {
        console.log('Server URLs:', serverMatches);
      }
    }
  }
}

dumpScripts().catch(console.error);
