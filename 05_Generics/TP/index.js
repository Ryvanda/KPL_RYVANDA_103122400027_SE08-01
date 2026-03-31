const str = "Bar bar Bar";

/**
 * @param {string} str - Teks input
 * @param {string} tipe - "semua" atau "huruf"
 */
function hitung(str, tipe) {
  let total = 0;
  for (const c of str) {
    if (tipe === "huruf") {
      if (c === " ") continue;
      total++;
    } else if (tipe === "semua") {
      total++;
    }
  }
  return total;
}

console.log(
  hitung(str, "semua"), // Harusnya 11
);

console.log(
  hitung(str, "huruf"), // Harusnya 9
);

hitung(str, "huruf"); // Tidak terjadi apa-apa
