/**
 * @swagger
 * components:
 *   schemas:
 *     Produtos:
 *       type: object
 *       required:
 *         - nome
 *         - descricao
 *         - quantidade
 *         - preco
 *         - desconto
 *         - dataDesconto
 *         - categoria
 *         - imagemProduto
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome do produto
 *         descricao:
 *           type: string
 *           description: Descrição do produto
 *         quantidade:
 *           type: number
 *           description: quantidade no estoque
 *         preco:
 *           type: number
 *           description: Preço do produto
 *         desconto:
 *           type: number
 *           description: Desconto do produto
 *         dataDesconto:
 *           type: date
 *           description: Data valida do desconto
 *         categoria:
 *           type: string
 *           description: Categoria do produto
 *         imagemProduto:
 *           type: string
 *           format: base64
 *           description: Imagem do produto
 */

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: CRUD produtos
 * /produtos:
 *   get:
 *     summary: Listar todos produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Listar todos os produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produtos'
 *   post:
 *     summary: Adicionar produtos.
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Produtos'
 *     responses:
 *       201:
 *         description: Produto adicionado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produtos'
 *       500:
 *         description: Ocorreu um erro.
 * /produtos/{id}:
 *   get:
 *     summary: Listar produto por id.
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id do produto.
 *     responses:
 *       200:
 *         description: Aluno encontrado por id.
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produtos'
 *       404:
 *         description: Aluno não encontrado.
 *   put:
 *    summary: Atualizar produtos por id.
 *    tags: [Produtos]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Id do produto.
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/Produtos'
 *    responses:
 *      200:
 *        description: Aluno atualizado.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Produtos'
 *      404:
 *        description: Aluno não encontrado.
 *      500:
 *        description: Ocorreu um erro.
 *   delete:
 *     summary: Remover produto por id.
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id do produto.
 *     responses:
 *       200:
 *         description: Aluno removido.
 *       404:
 *         description: Aluno não encontrado.
 *
 */

const { Produto, schema } = require("../models/produto");
const { Router } = require("express");
const uploadImage = require("../middlewares/uploadImage");

const router = Router();

router.get("/produtos", async (req, res) => {

  const { nome, categoria, preco, } = req.query;
  if ( nome ) {
    const produtos = await Produto.find({ nome: nome }).exec();
    return (produtos) ? res.status(200).json(produtos) : res.status(404).json({ message: "Nenhum produto encontrado." });
  }
  if ( categoria  ) {
    const produtos = await Produto.find({ categoria: categoria }).exec();
    return (produtos) ? res.status(200).json(produtos) : res.status(404).json({ message: "Nenhum produto encontrado." });
  }
  if ( preco ) {
    const produtos = await Produto.find({ preco: preco }).exec();
    return (produtos) ? res.status(200).json(produtos) : res.status(404).json({ message: "Nenhum produto encontrado." });
  }

  try {
    const produtos = await Produto.find({});
    if (produtos) {
      res.status(200).json(produtos);
    }
    else {
      res.status(404).json({ message: "Nenhum produto encontrado." });
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

router.post("/produtos", uploadImage.single('imagemProduto'), async (req, res) => {
  try {
    const { nome, descricao, quantidade, preco, desconto, dataDesconto, categoria } = req.body;
    const imagemProduto = req.file.path; 

    const { error, value } = schema.validate({ nome, descricao, quantidade, preco, desconto, dataDesconto, categoria, imagemProduto })
    if (error) {
      res.status(400).json({ error: error.message });
    }
    else {
      const produto = new Produto({ nome, descricao, quantidade, preco, desconto, dataDesconto, categoria, imagemProduto })
      await produto.save()
      res.status(201).json(produto);
    }
  }
  catch (e) {
    console.log(e);
    res.status(500).json({ message: "Ocorreu um erro." });
  }
});

router.put("/produtos/:id", uploadImage.single('imagemProduto'), async (req, res) => {
  try {
    const { nome, descricao, quantidade, preco, desconto, dataDesconto, categoria } = req.body;
    const imagemProduto = req.file.path;
    const { error, value } = schema.validate({ nome, descricao, quantidade, preco, desconto, dataDesconto, categoria, imagemProduto })
    if (error) {
      res.status(400).json({ error: error.message });
    }
    else {
      const produto = await Produto.findByIdAndUpdate(req.params.id, { nome, descricao, quantidade, preco, desconto, dataDesconto, categoria, imagemProduto });
      if (produto) {
        res.status(200).json({ message: "Produto editado." });
      }
      else {
        res.status(404).json({ message: "Produto não encontrado." });
      }
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