const roteador = require("express").Router();
const TabelaFornecedor = require("./TabelaFornecedor");
const Fornecedor = require("./Fornecedor");
const NaoEncontrado = require("../../erros/NaoEncontrado");
const SerializadorFornecedor = require("../../Serializador").SerializadorFornecedor;

roteador.get("/", async (req, res) => {
  const resultados = await TabelaFornecedor.listar();
  const serializador = new SerializadorFornecedor(
    res.getHeader('Content-Type')
  );
  res.send(serializador.serializar(resultados));
});

roteador.post("/", async (requisicao, resposta, proximo) => {
  try {
    const dadosRecebidos = requisicao.body;
    const fornecedor = new Fornecedor(dadosRecebidos);
    await fornecedor.criar();
    const serializador = new SerializadorFornecedor(
      res.getHeader('Content-Type')
    );
    resposta.status(201).send(serializador.serializar(fornecedor));
  } catch (er) {
    proximo(er);
  }
});

roteador.get("/:idFornecedor", async (req, res, proximo) => {
  try {
    const id = req.params.idFornecedor;
    const fornecedor = new Fornecedor({ id: id });
    await fornecedor.carregar();
    const serializador = new SerializadorFornecedor(
      res.getHeader('Content-Type')
    );
    res.status(200).send(serializador.serializar(fornecedor));
  } catch (er) {
    proximo(er);
  }
});

roteador.put("/:idFornecedor", async (req, res) => {
  try {
    const id = req.params.idFornecedor;
    const dadosRecebidos = req.body;
    const dados = Object.assign({}, dadosRecebidos, { id: id });
    const fornecedor = new Fornecedor(dados);
    await fornecedor.atualizar();
    res.status(204).end();
  } catch (erro) {
    proximo(erro);
  }
});

roteador.delete("/:idFornecedor", async (req, res, proximo) => {
  try {
    const id = req.params.idFornecedor;
    const fornecedor = new Fornecedor({ id: id });
    await fornecedor.carregar();
    await fornecedor.remover();
    res.status(204).end();
  } catch (er) {
    proximo(er);
  }
});

module.exports = roteador;
