async function testHollywood() {
  const url = "https://raw.githubusercontent.com/Watchout2025/RPM-Title-Fixer/refs/heads/main/movies/hollywood.json";
  try {
    const res = await fetch(url);
    console.log('Status:', res.status);
    const data = await res.json();
    console.log('Total movies count:', data.length);
    console.log('Sample movie 1:', JSON.stringify(data[0], null, 2));
    console.log('Sample movie 2:', JSON.stringify(data[1], null, 2));
    console.log('Sample movie 3:', JSON.stringify(data[2], null, 2));
  } catch (e) {
    console.error('Error:', e.message);
  }
}
testHollywood();
