async function getFullSearchScript() {
  const res = await fetch('https://netout.pages.dev/browse');
  const html = await res.text();
  const idx = html.indexOf('function fetchTMDBResults');
  if (idx !== -1) {
    console.log(html.slice(idx, idx + 2500));
  }
}
getFullSearchScript().catch(console.error);
