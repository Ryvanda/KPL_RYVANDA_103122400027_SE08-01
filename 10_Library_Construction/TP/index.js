/**
 * @param {string} str 
 * @returns {number}
 */
export function hitungHuruf(str) {
  const match = str.match(/[a-zA-Z]/g);
  return match ? match.length : 0;
}

/**
 * @param {string} str 
 * @returns {number}
 */
export function hitungKata(str) {
  const words = str.trim().split(/\s+/);
  return str.trim() === "" ? 0 : words.length;
}