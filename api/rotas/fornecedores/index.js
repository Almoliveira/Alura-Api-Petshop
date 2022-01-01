const roteador = require("express").Router();
const TabelaFornecedor = require("./TabelaFornecedor");
const Fornecedor = require("./Fornecedor");
const { response } = require("express");
const res = require("express/lib/response");
const NaoEncontrado = require("../../erros/NaoEncontrado");

roteador.get("/", async (req, res) => {
  const resultados = await TabelaFornecedor.listar();
  res.send(JSON.stringify(resultados));
});

roteador.post("/", async (requisicao, resposta, proximo) => {
  try {
    const dadosRecebidos = requisicao.body;
    const fornecedor = new Fornecedor(dadosRecebidos);
    await fornecedor.criar();
    resposta.status(201).send(JSON.stringify(fornecedor));
  } catch (er) {
    proximo(er);
  }
});

roteador.get("/:idFornecedor", async (req, res, proximo) => {
  try {
    const id = req.params.idFornecedor;
    const fornecedor = new Fornecedor({ id: id });
    await fornecedor.carregar();
    res.status(200).send(JSON.stringify(fornecedor));
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
      if(erro instanceof NaoEncontrado) {
        res.status(404)
      } else {
        res.status(400)
      }
    res.send(
      JSON.stringify({
        mensagem: erro.message,
        id: erro.idErro
      })
    );
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
    proximo(er)
  }
});

module.exports = roteador;
