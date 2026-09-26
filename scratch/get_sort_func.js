async function getSortScript() {
  const res = await fetch('https://netout.pages.dev/browse');
  const html = await res.text();
  const idx = html.indexOf('function processAndSortResults');
  if (idx !== -1) {
    console.log(html.slice(idx, idx + 2000));
  }
}
getSortScript().catch(console.error);
