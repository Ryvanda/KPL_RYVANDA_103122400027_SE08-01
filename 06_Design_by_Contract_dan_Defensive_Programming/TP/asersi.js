const assert = require('assert');

function divide(a, b) {
  assert(typeof a === 'number' && typeof b === 'number', 'Nilai harus bilangan bulat');

  assert(b !== 0, 'Tidak bisa pembagian dengan nol');

  return a / b;
}

console.log(divide(10, 2));
