import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/home/Home' //Importando das paginas que terão ligações.
import AdminPages from '../components/admin/AdminPages'
import ArticlesByCategory from '@/components/article/ArticlesByCategory' // Importando da pasta article.
import ArticleById from '@/components/article/ArticleById' // Importando da pasta article.

Vue.use(VueRouter) // Cadastrando VueRouter dentro de Vue.

const routes = [{ // Array de objetos // A base das Routes.
    name: 'home', // Rota para a pagina inicial de home.
    path: '/',
    component: Home
}, {
    name: 'adminPages', // Rota da pagina de administador.
    path: '/admin',
    component: AdminPages
}, {
    name: 'articlesByCategory', // Rotas das categorias.
    path: '/categories/:id/articles',
    component: ArticlesByCategory
}, {
    name: 'articleById', // Rota dos artigos.
    path: '/articles/:id',
    component: ArticleById
}]

export default new VueRouter({ // Instanciando VueRouter 
    mode: 'history', // Modo history para deixa a url bonitinha.
    routes // === routes: routes -> array de objetos
})
