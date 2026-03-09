const fizzBuzz = require('./tm');
const assert = require('assert');

function runTest(name, input, expected) {
    try {
        const result = fizzBuzz(input);
        assert.strictEqual(result, expected);
        console.log(`✅ ${name} berhasil`);
    } catch (error) {
        console.log(`❌ ${name} gagal`);
        console.log("Input   :", input);
        console.log("Expected:", expected);
        console.log("Result  :", fizzBuzz(input));
        console.log("--------------------------------");
    }
}

console.log("=== MENJALANKAN TEST ===\n");

runTest(
    "Test 1 (contoh soal)",
    [8, 9, 32, 75, 84],
    "Fizz 9 Fizz 75 FizzBuzz"
);

runTest(
    "Test 2 (angka campuran)",
    [1, 68, 83, 91, 97],
    "1 Fizz 83 Buzz 97"
);

runTest(
    "Test 3 (angka negatif)",
    [-2, -1, 0, 1, 2],
    "Fizz -1 FizzBuzz 1 Fizz"
);

runTest(
    "Test 4 (single element)",
    [-16],
    "Fizz"
);

runTest(
    "Test 5 (duplikasi)",
    [2, 2, 7, 7, 14],
    "Fizz Fizz Buzz Buzz FizzBuzz"
);

runTest(
    "Test 6 (array kosong)",
    [],
    ""
);

runTest(
    "Test 7 (input string)",
    "Hello",
    "Input tidak valid"
);

runTest(
    "Test 8 (input number)",
    10,
    "Input tidak valid"
);

console.log("\n=== TEST SELESAI ===");