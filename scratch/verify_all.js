async function verify() {
  const pageRes = await fetch("http://localhost:3000/");
  const pageHtml = await pageRes.text();
  console.log("Homepage status:", pageRes.status);
  console.log("Has Signal Interruption:", pageHtml.includes("Signal Interruption"));

  const catalogRes = await fetch("http://localhost:3000/api/catalog");
  const catalog = await catalogRes.json();
  console.log("Catalog categories:", Object.keys(catalog.catalog));
  for (const [cat, items] of Object.entries(catalog.catalog)) {
    console.log(` - ${cat}: ${items.length} items`);
  }
}

verify().catch(console.error);
