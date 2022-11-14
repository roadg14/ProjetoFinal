// Após colocar a authenticate os acessos só são permitidos após fazer login no signin.

const admin = require('./admin') // Importa o admin do admins.js e colocando ele em algumas funções
// usando o admin()

// Routes.js é onde vai ser minhas rotas.
module.exports = app => {
    // Públicas URL's que qualquer um pode acessar.
    app.post('/signup', app.api.user.save) // Essa é a rota que vai fazer o cadastro.
    app.post('/signin', app.api.auth.signin) // A roda que vai ser feito o login.
    app.post('/validateToken', app.api.auth.validateToken) // A validação do token.

    app.route('/users') // Consign acessa função de outro arquivo em outro pasta.
    .all(app.config.passport.authenticate()) // Autentica usuário logado
    .post(admin(app.api.user.save)) // Assim que se usar para acessar o arquivo de outra pasta Usando o 'Consign'.
    .get(admin(app.api.user.get)) // O Metodo Get que está em user.js.


    app.route('/users/:id') // Outra URL com ja selecionado o ID já para alterar. -> /:id ai que vai saber quem vai ser inserido ou alterado.
    .all(app.config.passport.authenticate()) // Autentica usuário logado
    .put(admin(app.api.user.save)) // O mesmo metodo vai ser usado para inserir ou alterar.
    .get(admin(app.api.user.getUserById)) // Para Selecionar um usuario pelo ID.
    .delete(admin(app.api.user.remove)) // Removendo o Usuari.post(admin(app.api.user.save)) // Assim que se usar para acessar o arquivo de outra pasta Usando o 'Consign'.o.

    app.route('/categories') // A rota para as categorias.
    .all(app.config.passport.authenticate()) // Autentica usuário logado.
    .get(admin(app.api.category.get)) // o get é para buscar.
    .post(admin(app.api.category.save)) // o Post é o metodo que vai salvar.

    // Cuidado com a ordem! Tem que vir antes de /categories/:id.
    app.route('/categories/tree') // A arvore qie ordena a lista de categorias.
    .all(app.config.passport.authenticate()) // Autentica usuário logado
    .get(app.api.category.getTree) // Paginação da ARVORE.

    app.route('/categories/:id') // Essas funções estão em Category.js.
    .all(app.config.passport.authenticate()) // Autentica usuário logado
    .get(app.api.category.getById) // Pesquisa.
    .put(admin(app.api.category.save)) // Fazendo a alteração.
    .delete(admin(app.api.category.remove)) // Excluir.

    app.route('/articles') // Funções que estão em articles.js
    .all(app.config.passport.authenticate()) // Autentica usuário logado
    .get(admin(app.api.article.get)) // Resultado.
    .post(admin(app.api.article.save)) // Criando e Salvando.

    app.route('/articles/:id') // A rota com id no final tambem.
    .all(app.config.passport.authenticate()) // Autentica usuário logado
    .get(app.api.article.getById) // Pesquisa.
    .put(admin(app.api.article.save)) // Fazendo a alteração.
    .delete(admin(app.api.article.remove)) // Excluir.

    app.route('/categories/:id/articles') // Rota para vincular as categorias com os artigos.
    .all(app.config.passport.authenticate()) // Autentica usuário logado
    .get(app.api.article.getByCategory) // Consulta em Knex a funçãi esta em article.js

    app.route('/stats') // Para saber as estatisticas de quantos tem, usuarios, categorias, e artigos.
    .all(app.config.passport.authenticate()) // Para acessar essas estatisticas tem que esta Logado.
    .get(app.api.stat.get) // T

}

