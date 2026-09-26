async function listAllHollywood() {
  const url = "https://raw.githubusercontent.com/Watchout2025/RPM-Title-Fixer/refs/heads/main/movies/hollywood.json";
  const res = await fetch(url);
  const data = await res.json();
  console.log(JSON.stringify(data.map(m => ({ id: m.id, title: m.title, mediaType: m.mediaType })), null, 2));
}
listAllHollywood();
