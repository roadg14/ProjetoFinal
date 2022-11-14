const app = require('express')() // Instância do express que será utilizada nos demais arquivos.
const consign = require('consign') // Consign auxilia a definir dependências da aplicação.
const db = require('./config/db') // Knex passando a conf de conexão ao banco de dados.
const mongoose = require('mongoose') // Importando o mongoose para fazer conexão com o MongoDB.

require('./config/mongodb') // Chamando os arquivos do que faz conexão com o MongoDB. // mongodb.js

// db que recebe o knex já configurado no arquivo knexfile.js -> ai voce conseguir fazer qualquer coisa, um delet ou um get.
app.db = db // Banco de dados fica a disposição para realizar as operações necessárias.
app.mongoose = mongoose // A mesma coisa do app.db = db.

// Ordem tem importancia na hora de leitura de cada função.
consign() // Chamando a função. // Consign vai ser responsavel para passar para cada dependencia os parametros de app.
.include('./config/passport.js') // Modo de autenticação. liberação de usuario.
    .then('./config/middlewares.js') // Encadiando por que o consign esta nesse arquivo.
    .then('./api/validation.js') // Executa primeiro validação do usuário.
    .then('./api') // O consign vai carregar todos que estiver na PASTA API.
    .then('/schedule') // Aqui dentro tem o temporizador das estatisticas para fica atualizando.
    .then('./config/routes.js')  // Tambem vai carrega os routes que estiverem no arquivo routes.js.
    .into(app) // Injeta app em cada uma das dependências.

app.listen(3000, () => { // Apontando a porta que estara sendo executado o Backend.
    console.log('Backend executando...!')
}) 