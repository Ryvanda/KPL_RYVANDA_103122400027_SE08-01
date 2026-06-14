const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tebak Angka",
      version: "1.0.0",
      description:
        "Sebuah API sederhana untuk permainan tebak angka berdasarkan nama pemain",
    },
  },
  apis: ["index.js"],
};

const specs = swaggerJsdoc(options);

module.exports = {
  specs,
  swaggerUi,
};
