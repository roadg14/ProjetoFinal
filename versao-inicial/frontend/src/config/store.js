import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Função que vai fazer com que suma e apareça quando for clicado o menu do lado.
export default new Vuex.Store({
    state: {
        isMenuVisible: true,
        user: { // Usuario.
            name: 'Usuario Mock',
            email: 'mock@gmail.com'
        }
    },
    mutations: { // ALTERANDO O hideToggle -> Para True e False.
        toggleMenu(state, isVisible){ // Função para Quando for clicado o menu fica True e para quando estiver sem nada coloca False.
            if(isVisible === undefined) {
                state.isMenuVisible = !state.isMenuVisible
            } else {
                state.isMenuVisible = isVisible
            }
        }
    }
})