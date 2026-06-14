// Kode Buruk (Bad Practice) - Menggunakan Nested If (Arrow Anti-Pattern)
function processUserBad(user) {
    if (user) {
        if (user.isActive) {
            if (user.hasPermission) {
                return doSomething(user);
            }
        }
    }
    return null;
}

// Kode Bersih (Clean Code Practice) - Menggunakan Guard Clauses dan Single Responsibility Principle
function processUser(user) {
    if (!isValidCandidate(user)) return null;
    return doSomething(user);
}

// Fungsi pembantu untuk memvalidasi kelayakan user (Abstraksi & Reusable)
function isValidCandidate(user) {
    return user && user.isActive && user.hasPermission;
}

// Fungsi dummy untuk kebutuhan eksekusi
function doSomething(user) {
    return `User ${user.name} berhasil diproses!`;
}

// Eksekusi Contoh
const userSample = {
    name: "Ryvanda",
    isActive: true,
    hasPermission: true
};

console.log(processUser(userSample));
