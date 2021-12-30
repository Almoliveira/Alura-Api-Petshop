const roteador = require("express").Router();
const TabelaFornecedor = require("./TabelaFornecedor");
const Fornecedor = require('./Fornecedor');

roteador.get("/", async (req, res) => {
  const resultados = await TabelaFornecedor.listar();
  res.send(JSON.stringify(resultados));
});

roteador.post('/', async (requisicao, resposta) => {
    const dadosRecebidos = requisicao.body
    const fornecedor = new Fornecedor(dadosRecebidos)
    await fornecedor.criar()
    resposta.send(
        JSON.stringify(fornecedor)
    )
})


roteador.get('/:idFornecedor', async(req,res) => {
    

    try{
        const id = req.params.idFornecedor;
        const fornecedor = new Fornecedor({ id: id,  })
        await fornecedor.carregar();
        res.send(
            JSON.stringify(fornecedor)
        )
    } catch (er) {
        res.send(
            JSON.stringify({
                mensagem: er.message
            })
        )
    }
});

roteador.put('/:idFornecedor', async (req, res) => {
    try {
        const id = req.params.idFornecedor
        const dadosRecebidos = req.body
        const dados = Object.assign({}, dadosRecebidos, { id: id })
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar()
        res.end()
    } catch (erro) {
        res.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

module.exports = roteador;
