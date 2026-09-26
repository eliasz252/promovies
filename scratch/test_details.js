async function testDetails() {
  const ids = [1284041, 1202033, 1318447, 875828, 812583, 533533];
  for (const id of ids) {
    try {
      const res = await fetch(`https://db.wecollege.net/3/movie/${id}`);
      if (res.ok) {
        const data = await res.json();
        console.log(`ID ${id}: "${data.title}" | Release: ${data.release_date} | Rating: ${data.vote_average} | Overview: ${data.overview ? data.overview.slice(0, 80) + '...' : 'No overview'}`);
      } else {
        console.log(`ID ${id}: status ${res.status}`);
      }
    } catch (e) {
      console.log(`ID ${id}: error ${e.message}`);
    }
  }
}
testDetails();
