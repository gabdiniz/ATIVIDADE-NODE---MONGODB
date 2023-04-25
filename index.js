require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL);
const Produto = require("./models/produto");

const rotasProdutos = require("./routes/produtos");
app.use(rotasProdutos);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Produtos API",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000/"));