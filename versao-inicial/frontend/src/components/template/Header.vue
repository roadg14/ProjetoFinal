<template>
     <header class="header">
        <a class="toggle" @click="toggleMenu" v-if="!hideToggle"> <!-- @click -> é para da um evento ao clicar. // hidetoggle -> é para esconder a setinha que vai mostrar-->
            <i class="fa fa-align" :class="icon"></i>
        </a>
        <h1 class="title">
            <router-link to="/">{{ title }}</router-link>
        </h1>
        <UserDropdown v-if="!hideUserDropdown" />
     </header>
</template>

<script>

import UserDropdown from './UserDropdown.vue' // Importado o UserDropdown.vue para o usuario.

export default {
    name: 'Header',
    components: { UserDropdown },
    props: {
        title: String,
        hideToggle: Boolean, // Vai ser um Botão que vai aparecer certos menus.
        hideUserDropdown: Boolean // Fazendo a mesma coisa para o usuario, quando for clicando mostrar as opções.
    },
    computed: {
        icon() { // Um retorno ternario.
            return this.$store.state.isMenuVisible ? "fa-angle-double-left" : "fa-angle-double-down"
        }
    },
    methods: {
        toggleMenu() { // Aqui da a função para o icone do menuzinho abrir.
            this.$store.commit('toggleMenu') // Vai chamar a função que está em store.js // store -> importada em main.js
        }
    }
}
</script>

<style>
    .header {
        grid-area: header;
        background: linear-gradient(to right, #1e469a, #49a7c1);
        
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title {
        font-size: 1.2rem;
        color: #fff;
        font-weight: 100;
        flex-grow: 1; /* title pode crescer dentro do flex container */
        text-align: center;
        margin-top: 8px;
    }

    .title a {
        color: #fff;
        text-decoration: none;
    }

    .title a:hover {
        color: #fff;
        text-decoration: none;
    }

    header.header > a.toggle {
        width: 60px;
        height: 100%;
        color:#fff;
        justify-self: flex-start;
        text-decoration: none;
        
        display: flex;
        justify-content: center;
        align-items: center;
    }

    header.header > a.toggle:hover {
        color:#fff;
        background-color: rgba(0, 0, 0, 0.2);
    }
</style>