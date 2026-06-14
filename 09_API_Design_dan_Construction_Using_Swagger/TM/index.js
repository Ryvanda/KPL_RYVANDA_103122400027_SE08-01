const { swaggerUi, specs } = require("./swagger");
const express = require("express");
const app = express();
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

const PORT = 3000;

/**
 * @swagger
 * /:
 *   get:
 *    summary: Landing page untuk API Tebak Angka
 *    responses:
 *      200:
 *        description: Berhasil mengakses landing page
 */
app.get("/", (req, res) => {
  const landing = {
    pesan: "Selamat datang di API Tebak Angka!",
  };
  res.json(landing);
});

/**
 * @swagger
 * /tebak:
 *   post:
 *     summary: Endpoint untuk menebak angka
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *                 description: Nama pemain
 *               tebakan:
 *                 type: integer
 *                 description: Angka yang ditebak (1-100)
 *     responses:
 *       200:
 *         description: Hasil tebakan
 */
app.post("/tebak", (req, res) => {
  const { nama, tebakan } = req.body;
  let totalAscii = 0;   
  for (let i = 0; i < nama.length; i++) {
    totalAscii += nama.charCodeAt(i);
  }

  const angka = (totalAscii % 100) + 1;

  let hasil;
  if (tebakan < angka) {
    hasil = "Tebakan terlalu rendah!";
  } else if (tebakan > angka) {
    hasil = "Tebakan terlalu tinggi!";
  } else {
    hasil = `Benar sekali! Angkanya adalah ${angka}.`;
  }
  res.json({
    hasil,
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
