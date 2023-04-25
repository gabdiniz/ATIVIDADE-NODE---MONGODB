require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL);
const Produto = require("./models/produto");

const rotasProdutos = require("./routes/produtos");
app.use(rotasProdutos);

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000/"));