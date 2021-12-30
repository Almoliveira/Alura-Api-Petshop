const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const roteador = require('./rotas/fornecedores')
app.use('/api/fornecedores', roteador)

app.listen(config.get('api.porta'), () => console.log('A API está funcionando!\n\n\n'))