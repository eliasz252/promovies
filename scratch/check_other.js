async function checkOtherJsons() {
  const mcu = await (await fetch("https://raw.githubusercontent.com/Watchout2025/RPM-Title-Fixer/refs/heads/main/mcu.json")).json();
  const anim = await (await fetch("https://raw.githubusercontent.com/Watchout2025/RPM-Title-Fixer/refs/heads/main/animation.json")).json();
  console.log('MCU count:', mcu.length, 'sample:', mcu.slice(0, 3).map(x => x.title));
  console.log('Animation count:', anim.length, 'sample:', anim.slice(0, 3).map(x => x.title));
}
checkOtherJsons();
