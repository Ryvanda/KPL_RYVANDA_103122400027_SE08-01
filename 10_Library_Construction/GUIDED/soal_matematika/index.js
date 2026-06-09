import { pslv_dua, pslv_tiga, ptlsv_dua } from "persamaan";

// Jangan lupa tambahkan "type": "module" pada package.json agar bisa menggunakan import dan export
// 3x = 12
const jawaban1 = pslv_dua("3x", 12);
const jawaban2 = pslv_tiga("x", -8, 10);

// -2x + 10 <= 4
const jawaban3 = ptlsv_dua("-2x", 10, "<=", 4);

console.log(jawaban1);
console.log(jawaban2);
console.log(jawaban3);
