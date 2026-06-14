const express = require("express");
const { specs, swaggerUi } = require("./swagger.js");

const app = express();
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *      - General
 *     summary: Menampilkan pesan selamat datang
 *     responses:
 *       200:
 *         description: Berhasil
 */
app.get("/", (req, res) => {
  return res.status(200).send("Hello, World!");
});

const dataFilm = [];

/**
 * @swagger
 * /film:
 *   get:
 *     tags:
 *      - Film
 *     summary: Daftar semua film
 *     responses:
 *       200:
 *         description: Berhasil
 */
app.get("/film", (req, res) => {
  return res.status(200).json(dataFilm);
});

/**
 * @swagger
 * /film:
 *   post:
 *     tags:
 *      - Film
 *     summary: Tambah film baru
 *     responses:
 *       201:
 *         description: Berhasil
 */
app.post("/film", (req, res) => {
  const filmBaru = {
    id: dataFilm.length + 1,
    title: "Film " + (dataFilm.length + 1),
    genre: "Genre " + (dataFilm.length + 1),
    tahun: 2024,
  };
  dataFilm.push(filmBaru);
  return res.status(201).json(filmBaru);
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Peladen berjalan di http://localhost:${PORT}`);
});