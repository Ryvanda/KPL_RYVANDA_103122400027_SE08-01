function divide(a, b) {
  // Prakondisi
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Salah tipe data. Harus bilangan bulat");
  }
  if (b === 0) {
    throw new Error("Tidak boleh dibagi dengan 0");
  }

  
  const hasil = a / b;

  // Pascakondisi
  if (hasil * b === a) {
    return hasil;
  }
  return hasil;
}

try {
  console.log(divide(10, 0));
} catch (error) {
  console.error(error.message);
}
