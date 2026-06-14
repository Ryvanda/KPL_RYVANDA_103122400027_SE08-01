const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Menu Makanan",
      version: "1.0.0",
      description:
        "Sebuah API sederhana tentang menu makanan yang kami sediakan",
    },
  },
  apis: ["index.js"],
};

const specs = swaggerJsdoc(options);

module.exports = {
  specs,
  swaggerUi,
};
