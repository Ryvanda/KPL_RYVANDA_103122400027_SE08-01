/**
 * Persamaan Linear Satu Variable dan dua suku
 * @param {string} x
 * @param {number} a
 */

export function pslv_dua(x, a) {
  // 3x = 12
  const coeff = parseInt(x);
  const hasil = a / coeff;
  return {
    x: x,
    dengan: "=",
    hasil,
  };
}

/** * Persamaan Linear Satu Variable dan tiga suku
 * @param {string} x
 * @param {number} a
 * @param {number} b
 */

export function pslv_tiga(x, a, b) {
  // y - 8 = 10
  let hasil = 0;

  // Jika hanya satu koefisien
  if (x.length === 1) {
    hasil = b - a;
  } else if (x.length >= 2) {
    const coeff = parseInt(x);
    hasil = (b - a) / coeff;
  }

  return {
    x: x,
    dengan: "=",
    hasil,
  };
}

/**
 * Persamaan Linear Satu Variable dan n suku
 * @param {string} x
 * @param {number} a
 * @param {number} b
 */
export function ptlsv_dua(x, a, op, b) {
  // -2x + 10 <= 4
  let hasil = 0;

  const balikkan_op = {
    ">": "<",
    "<": ">",
    ">=": "<=",
    "<=": ">=",
  };

  const coeff = parseInt(x);

  // Jika hanya satu koefisien
  if (x.length === 1) {
    hasil = b - a;
  } else if (x.length >= 2) {
    hasil = (b - a) / coeff;
  }

  const op_baru = coeff <= -1 ? balikkan_op[op] : op;

  return {
    "x": x,
    "dengan": op_baru,
    hasil,
  };
}
