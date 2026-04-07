/**
 *
 * @param {String} input Dertan string
 * @returns {String} Dertan string yang ada FizzBuzz
 */

function fizzBuzz(input) {
  /** @type {Array<String>} */
  const deretLarik = input.split(" ");

  let hasil = "";
  for (const d in deretLarik) {
    const bil = +d;
    let fz = "";

    if (bil % 3 === 0) {
      fz += "Fizz";
    }
    if (bil % 5 === 0) {
      fz += "Buzz";
    }
    if (fz !== "") {
      hasil += `${fz} `;
      continue;
    }

    hasil += bil;
  }

  return hasil;
}

console.log(fizzBuzz("1 2 3 4 5 6 7 8 9 10"));
