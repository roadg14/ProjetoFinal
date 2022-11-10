
// Routes.js é onde vai ser minhas rotas.
module.exports = app => {
    // Públicas URL's que qualquer um pode acessar.
    app.route('/users') // Consign acessa função de outro arquivo em outro pasta.
    .post(app.api.user.save) // Assim que se usar para acessar o arquivo de outra pasta Usando o 'Consign'.
}