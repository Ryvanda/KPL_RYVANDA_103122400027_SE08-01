function divide(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Nilai harus bilangan bulat");
  }

  if (b === 0) {
    throw new Error("Tidak bisa pembagian dengan nol");
  }

  return a / b;
}

try {
  const result = divide(10, 2);
  console.log("Hasilnya adalah:", result);
} catch (error) {
  console.error("Error:", error);
}