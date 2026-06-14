const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Film Pribadi",
      version: "1.0.0",
      description:
        "Sebuah API sederhana tentang film-film pribadi yang kami sediakan",
    },
    tags: [
      {
        name: "General",
        description: "Endpoint umum",
      },
      {
        name: "Film",
        description: "Manajemen data film",
      },
    ],
  },
  apis: ["./apps.js"],
};

const specs = swaggerJsdoc(options);

module.exports = {
  specs,
  swaggerUi,
};
