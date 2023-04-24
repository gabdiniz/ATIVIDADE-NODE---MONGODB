const { model, Schema } = require("mongoose");
const Joi = require('joi');

const Produto = model("produto", new Schema({
  nome: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  quantidade: {
    type: Number,
    required: true
  },
  preco: {
    type: Number,
    required: true
  },
  desconto: {
    type: Number,
    required: true
  },
  dataDesconto: {
    type: Date,
    required: true
  },
  categoria: {
    type: String,
    required: true
  },
  imagemProduto: {
    type: String,
    required: true
  },
}));

  const schema = Joi.object({
    nome: Joi.string().required(),
    descricao: Joi.string().required(),
    quantidade: Joi.number().integer().required(),
    preco: Joi.number().required(),
    desconto: Joi.number().required(),
    dataDesconto: Joi.date().iso(),
    categoria: Joi.string().required(),
    imagemProduto: Joi.string()
  })

module.exports = { schema, Produto };