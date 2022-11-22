import Vue from 'vue'
import Vuex from 'vuex' // Vuex -> compartilhar/manipular dados entre componentes
import axios from 'axios' // Aparti desse import voce consegui setar os token no header do axios.

Vue.use(Vuex)

// Função que vai fazer com que suma e apareça quando for clicado o menu do lado.
export default new Vuex.Store({
    state: {
        isMenuVisible: false, // o menu quando o ususario não estiver logado vai ficar em false.
        user: null // O usuario fica nulo por que, tem que fazer login para ver os menus.
        // user: { // Usuario.
            //name: 'Usuario Mock',
            //email: 'mock@gmail.com'
    },
    mutations: { // ALTERANDO O hideToggle -> Para True e False.
        toggleMenu(state, isVisible) { // Função para Quando for clicado o menu fica True e para quando estiver sem nada coloca False.
            if(!state.user) { // Se não tiver usuario o menu não vai aparecer.
                state.isMenuVisible = false
                return
            }
            
            if(isVisible === undefined) { // Alterna entre verdadeiro e falso
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }
        }
    },
    setUser(state, user) {
        state.user = user
        if(user) { // Se o usuario foi setado chame.
            axios.defaults.headers.common['Authorization'] = `bearer ${user.token}` // Quando o usuario for logado.
            state.isMenuVisible = true // mostrar o menu quando o usuario for logado.
        } else { // Caso contrario eu irei deleta a authorização
            delete axios.defaults.headers.common['Authorization']
            state.isMenuVisible = false
        }
    }
})