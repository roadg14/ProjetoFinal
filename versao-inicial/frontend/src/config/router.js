import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/home/Home' //Importando das paginas que terão ligações.
import AdminPages from '../components/admin/AdminPages'
import ArticlesByCategory from '@/components/article/ArticlesByCategory' // Importando da pasta article.
import ArticleById from '@/components/article/ArticleById' // Importando da pasta article.
import Auth from '@/components/auth/Auth' // Importando da pasta auth.

import { userKey } from '@/global'

Vue.use(VueRouter) // Cadastrando VueRouter dentro de Vue.

const routes = [{ // Array de objetos // A base das Routes.
    name: 'home', // Rota para a pagina inicial de home.
    path: '/',
    component: Home
}, {
    name: 'adminPages', // Rota da pagina de administador.
    path: '/admin',
    component: AdminPages,
    meta: { requireAdmin: true} // Para poder acessar a pagina de admin só vai poder se for ADMINISTRADOR.  
}, {
    name: 'articlesByCategory', // Rotas das categorias.
    path: '/categories/:id/articles',
    component: ArticlesByCategory
}, {
    name: 'articleById', // Rota dos artigos.
    path: '/articles/:id',
    component: ArticleById
}, {
    name: 'auth', // Rota do login e cadastros.
    path: '/auth',
    component: Auth
}]

const router = new VueRouter({ // Instanciando VueRouter 
    mode: 'history', // Modo history para deixa a url bonitinha.
    routes // === routes: routes -> array de objetos
})

// Chamando um evento quando for navegado de rotas para outra.
// Paginação para administrador.
router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)

    if(to.matched.some(record => record.meta.requiresAdmin)) {
        const user = JSON.parse(json)
        user && user.admin ? next() : next({ path: '/' })
    } else {
        next()
    }
})

export default router