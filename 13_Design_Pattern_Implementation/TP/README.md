# Tugas Pendahuluan 13: Design Pattern Implementation

  **Nama** : Ryvanda  
  **NIM** : 103122400027  
  **Kelas** : SE-08-01  

## Tugas

Bukalah repostori kode tugas besarmu dan carilah satu saja design pattern yang digunakan di dalamnya (boleh design pattern apa saja, akan direviu kasus-per-kasus). Sertakan kodenya di tugas ini dan coba jelaskan desainnya.

## Program/Kode

Berikut file-file yang relevan dengan design pattern yang dianalisis:

- [backend/src/utils/orderStateMachine.js](TUBES-KPL-TIM-GEHENDUL/backend/src/utils/orderStateMachine.js)
- [backend/src/controllers/orderController.js](TUBES-KPL-TIM-GEHENDUL/backend/src/controllers/orderController.js)
- [backend/src/routes/orderRoutes.js](TUBES-KPL-TIM-GEHENDUL/backend/src/routes/orderRoutes.js)
- [backend/src/utils/ApiError.js](TUBES-KPL-TIM-GEHENDUL/backend/src/utils/ApiError.js)

## Output

Tidak ada output visual langsung; design pattern ini bekerja di sisi server dan dapat diuji melalui endpoint API.

---

## Deskripsi Design Pattern

### Design Pattern yang Digunakan: State Machine Pattern (Behavioral Pattern)

Pada tugas besar tim **Gehendul** (Smart Canteen), terdapat implementasi **State Machine Pattern** yang diterapkan secara eksplisit untuk mengelola siklus hidup (*lifecycle*) status pesanan makanan. Pattern ini termasuk dalam kategori **Behavioral Design Pattern** yang berfokus pada bagaimana objek atau sistem bertransisi antar kondisi secara terkontrol dan tervalidasi.

---

## Penjelasan State Machine

### Konsep Dasar

*State Machine* (atau *Finite Automata*) mendefinisikan sebuah sistem yang memiliki sejumlah **state (kondisi)** yang terbatas, dan perpindahan antar state tersebut (*transition*) hanya boleh terjadi berdasarkan aturan yang sudah ditetapkan. Ini mencegah sistem masuk ke kondisi yang tidak valid atau tidak konsisten.

Dalam konteks aplikasi kantin, status pesanan hanya boleh berpindah secara satu arah mengikuti alur yang logis:

```
ORDERED ──► COOKING ──► READY ──► DONE
```

Transisi terbalik (seperti dari `DONE` kembali ke `COOKING`) **tidak diperbolehkan** dan akan secara otomatis ditolak oleh sistem.

---

## Implementasi di Kode

### 1. Definisi State dan Transisi (`orderStateMachine.js`)

File ini adalah inti dari pattern. Di sinilah seluruh aturan state machine didefinisikan secara deklaratif dan terpusat:

```javascript
const STATES = Object.freeze({
  ORDERED: 'ORDERED',
  COOKING: 'COOKING',
  READY:   'READY',
  DONE:    'DONE',
});

const TRANSITIONS = Object.freeze({
  ORDERED: ['COOKING'],
  COOKING: ['READY'],
  READY:   ['DONE'],
  DONE:    [],           // State terminal, tidak bisa berpindah lagi
});
```

Penggunaan `Object.freeze()` memastikan bahwa objek `STATES` dan `TRANSITIONS` bersifat **immutable** — tidak ada bagian lain dari kode yang dapat mengubah aturan transisi secara tidak sengaja saat runtime. Ini adalah praktik *defensive programming* yang sangat baik.

Modul ini juga mengekspor dua fungsi utilitas kunci:

```javascript
function canTransition(from, to) {
  if (!isValidState(from) || !isValidState(to)) return false;
  return TRANSITIONS[from].includes(to);
}

function nextStates(from) {
  if (!isValidState(from)) return [];
  return [...TRANSITIONS[from]];
}
```

- **`canTransition(from, to)`** — Memeriksa apakah perpindahan dari state `from` ke state `to` diizinkan sesuai aturan.
- **`nextStates(from)`** — Mengembalikan daftar state yang bisa dituju dari state saat ini, berguna untuk memberikan pesan error yang informatif.

### 2. Penerapan di Controller (`orderController.js`)

State machine digunakan secara aktif di fungsi `updateOrderStatus` yang hanya bisa diakses oleh admin:

```javascript
const { status } = req.body || {};

// Validasi: apakah status yang diminta merupakan state yang valid?
if (!isValidState(status)) {
  throw ApiError.badRequest("status harus salah satu dari ORDERED/COOKING/READY/DONE");
}

// Ambil status pesanan saat ini dari database
const [rows] = await pool.query('SELECT id, status FROM orders WHERE id = ?', [id]);
const current = rows[0].status;

// Validasi: apakah transisi dari status saat ini ke status baru diizinkan?
if (!canTransition(current, status)) {
  throw ApiError.badRequest(
    `Transisi tidak valid: ${current} -> ${status}. Allowed: ${nextStates(current).join(', ') || '(none)'}`
  );
}
```

Jika transisi tidak valid, sistem memberikan pesan error yang **sangat informatif**: menyebutkan state asal, state tujuan yang gagal, dan state mana yang seharusnya diperbolehkan. Ini sangat membantu dalam proses debugging dan integrasi API.

Saat transisi berhasil, server juga mengirimkan notifikasi *real-time* ke semua klien yang terhubung melalui **Socket.io**:

```javascript
io.emit('order:status', { orderId: id, status, order: orderData });
```

### 3. Routing dengan Middleware Otorisasi (`orderRoutes.js`)

Endpoint untuk memperbarui status pesanan dilindungi oleh dua lapis middleware:

```javascript
router.patch('/:id/status', authenticate, authorize('admin'), asyncHandler(updateOrderStatus));
```

- **`authenticate`** — Memverifikasi JWT token untuk memastikan request datang dari pengguna yang sudah login.
- **`authorize('admin')`** — Memastikan hanya pengguna dengan role `admin` yang bisa mengubah status pesanan.

---

## Diagram Alur State Machine

```
                  ┌─────────────────────────────────────────┐
                  │         ORDER LIFECYCLE                 │
                  └─────────────────────────────────────────┘

[Pelanggan Pesan]
        │
        ▼
  ┌──────────┐    Admin Konfirmasi    ┌──────────┐
  │ ORDERED  │ ─────────────────────► │ COOKING  │
  └──────────┘                        └──────────┘
                                           │
                                    Admin Selesai Masak
                                           │
                                           ▼
                                      ┌───────┐    Admin Tandai Selesai    ┌──────┐
                                      │ READY │ ─────────────────────────► │ DONE │
                                      └───────┘                            └──────┘
                                                                          (Terminal)
```

---

## Keunggulan Penerapan Pattern Ini

Pertama, dari sisi **keamanan data**, penerapan State Machine memastikan status pesanan tidak bisa diubah secara sembarangan. Admin tidak bisa melompati tahapan (misalnya langsung dari `ORDERED` ke `DONE`) atau membalik status yang sudah selesai, karena setiap permintaan transisi divalidasi terlebih dahulu oleh fungsi `canTransition()`.

Kedua, pattern ini menerapkan prinsip **Single Source of Truth**. Seluruh aturan tentang state mana yang boleh berpindah ke state mana hanya ditulis di satu tempat, yaitu file `orderStateMachine.js`. Jika suatu saat aturan bisnis berubah, pengembang cukup mengubah file tersebut tanpa harus menelusuri dan memperbaiki banyak tempat di seluruh kode.

Ketiga, **pesan error yang dihasilkan sangat informatif**. Ketika terjadi percobaan transisi yang tidak valid, sistem tidak hanya menolak permintaan, tetapi juga memberitahu state saat ini, state tujuan yang gagal, dan state apa saja yang seharusnya diperbolehkan. Ini sangat membantu proses debugging maupun integrasi oleh tim frontend.

Keempat, pattern ini sangat **mudah diperluas di masa depan**. Jika bisnis membutuhkan state baru seperti `CANCELLED` atau `REFUNDED`, pengembang cukup menambahkan entri baru pada objek `TRANSITIONS` tanpa perlu menyentuh logika di controller maupun lapisan lainnya.

Kelima, fungsi-fungsi inti seperti `canTransition()` dan `nextStates()` memiliki **testability yang tinggi**. Keduanya adalah fungsi murni (*pure function*) yang tidak bergantung pada database atau HTTP, sehingga dapat diuji secara terisolasi menggunakan unit test sederhana tanpa membutuhkan setup lingkungan yang kompleks.
