const { specs, swaggerUi } = require("./swagger");
const express = require("express");

const app = express();
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

const PORT = 3000;

const menuData = {
  bakmi: {
    "bakmi ayam spesial": 25000,
    "bakmi rica-rica": 28000,
    "bakmi komplit (bakso pangsit)": 35000,
  },
  rames: {
    "nasi rames biasa": 15000,
    "nasi rames rendang": 25000,
    "nasi rames telur balado": 18000,
  },
};

/**
 * @swagger
 * /:
 *   get:
 *     summary: Landing page untuk API Menu Makanan
 *     responses:
 *       200:
 *         description: Berhasil mengakses landing page
 */

app.get("/", (req, res) => {
  const landing = {
    pesan: "Cek dokumentasi API di /docs",
  };

  const menu = menuData;

  if (menu) {
    res.json(menu);
  } else {
    res.status(404).json({ error: "Menu tidak ditemukan" });
  }
});

/**
 * @swagger
 * /menu/{category}:
 *   get:
 *     summary: Mendapatkan menu berdasarkan kategori
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: Nama kategori (contoh bakmi atau rames)
 *     responses:
 *       200:
 *         description: Menu berhasil ditampilkan
 *       404:
 *         description: Kategori tidak ditemukan
 */
app.get('/menu/:category', (req, res) => {
    const category = req.params.category.toLowerCase(); // Tambahkan toLowerCase agar lebih aman
    const menu = menuData[category];

    if (menu) {
        res.json(menu);
    } else {
        res.status(404).json({ error: "Kategori menu tidak ditemukan" });
    }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
