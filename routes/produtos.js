const Produto = require("../models/produto");
const { Router } = require("express");

const router = Router();

router.get("/produtos", async (req, res) => {
  try {
    const produtos = await Produto.find({});
    if (produtos) {
      res.status(200).json(produtos);
    }
    else {
      res.status(200).json({ message: "Nenhum produto encontrado." });
    }
  }
  catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ocorreu um erro." });
  }
});

router.get("/produtos/:id", async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (produto) {
      res.status(200).json(produto);
    }
    else {
      res.status(404).json({ message: "Produto não encontrado." });
    }
  }
  catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ocorreu um erro." });
  }
});

router.post("/produtos", async (req, res) => {
  try {
    const { nome, descricao, quantidade, preco, desconto, dataDesconto, categoria, imagemProduto } = req.body;
    const produto = new Produto({ nome, descricao, quantidade, preco, desconto, dataDesconto, categoria, imagemProduto })
    await produto.save()
    res.status(201).json(produto);
  }
  catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ocorreu um erro." });
  }  
});

router.put("/produtos/:id", async (req, res) => {
  try {
    const { nome, descricao, quantidade, preco, desconto, dataDesconto, categoria, imagemProduto } = req.body;
    const produto = await Produto.findByIdAndUpdate(req.params.id, { nome, descricao, quantidade, preco, desconto, dataDesconto, categoria, imagemProduto });
    if (produto) {
      res.status(200).json({ message: "Produto editado." });
    }
    else {
      res.status(404).json({ message: "Produto não encontrado." });
    }
  }
  catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ocorreu um erro." });
  }
})

router.delete("/produtos/:id", async (req, res) => {
  try {
    const produto = await Produto.findByIdAndDelete(req.params.id);
    if (produto) {
      res.status(200).json({ message: "Produto deletado." });
    }
    else {
      res.status(404).json({ message: "Produto não encontrado." });
    }
  }
  catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ocorreu um erro." });
  }
});

module.exports = router;