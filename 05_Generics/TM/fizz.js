// Tambah JSDoc di sini
/**
 * @param {number} value Bilangan yang akan diubah
 * @returns {string|number} Mengembalikan "Fizz", "Buzz", "FizzBuzz", atau angka itu sendiri
 */
function zzzzOrNum(value) {
    if (typeof value !== 'number') {
        throw new Error("Input harus berupa angka");
    }

    if(value % 3 === 0 && value % 5 === 0 ) {
        return "FizzBuzz"
    } else if(value% 3 === 0){
        return "Fizz"
    } else if(value % 5 === 0) {
        return "Buzz"
    } else {
        return value
    }
}

// Tambah JSDOC di sini
/**
 * @param {number[]} sequence Array yang berisi bilangan bulat
 * @returns {(string|number)[]} Array baru yang berisi campuran string dan angka.
 */
function fizzBuzz(sequence) {
    if (!Array.isArray(sequence)) {
        throw new Error("Input harus berupa Array");
    }

    const newSequence = sequence.map((e) => zzzzOrNum(e));

    return newSequence;
}

module.exports = {
    fizzBuzz: fizzBuzz,
    zzzzOrNum: zzzzOrNum,
};