<template>
    <div class="user-dropdown">
        <div class="user-button"> <!-- Button que vai ser o nome do usuario.-->
            <span class="d-none d-sm-block"> {{ user.name }}</span> <!-- Usando as duas {{}} ele vai buscar o nome do usuario logado. Usando propriedades do bootstrap-->
            <div class="user-dropdown-img">
                <!-- :email -> para que valor possa ser interpretado -->
                <!-- Gravatar renderiza a imagem -->
                <Gravatar :email="user.email" alt="User" />
            </div>
            <i class="fa fa-angle-down"></i>
        </div>
        <div class="user-dropdown-content">
            <router-link to="/admin" v-if="user.admin">
                <i class="fa fa-cogs"></i> Administração 
            </router-link>
            <!-- Quando for clicando em SAIR ele vai volta pra tela de login. -->
            <a href @click.prevent="logout"><i class="fa fa-sign-out"></i> Sair </a>
        </div>
    </div>
</template>

<script>

import { userKey } from '@/global'
import { mapState } from 'vuex';
import Gravatar from 'vue-gravatar' // Esse import é para que apareça um icone no usuario, uma imagem.

export default {
    name: 'UserDropdown',
    components: { Gravatar },
    computed: mapState(['user']),
    methods: {
        logout() { // Função para deslogar.
            localStorage.removeItem(userKey) // Remoder a chave de acesso
            this.$store.commit('setUser', null) // Vai esconder o menu
            this.$router.push({ name: 'auth' }) // Assim que desconectar vai para a tela de autenticação = login.
        }
    }   
}
</script>

<style>
    .user-dropdown {
        position: relative;
        height: 100%;
    }

    .user-button {
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 100;
        height: 100%;
        padding: 0 20px;
    }

    .user-dropdown:hover {
        background-color: rgba(0, 0, 0, 0.2);
    }

    .user-dropdown-img {
        margin: 0 10px;
    }

    .user-dropdown-img > img { /** Gravatar renderiza a imagem */
        max-height: 37px;
        border-radius: 5px;
    }

    .user-dropdown-content {
        position: absolute;
        right: 0px;
        background-color: #f9f9f9;
        min-width: 170;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        padding: 10px;
        z-index: 1;

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        visibility: hidden;
        opacity: 0;
        transition: visibility 0s, opacity 0.5s linear;
    }

    .user-dropdown:hover .user-dropdown-content{ /* Quando o mouse passar por cima do nome do usuario ou do icone vai mostrar o conteudo. */
        visibility: visible;
        opacity: 1;
    }

    .user-dropdown-content a {
        text-decoration: none;
        color: #000;
        padding: 10px;
    }

    .user-dropdown-content a:hover {
        color: #000;
        background-color: #EDEDED;
        text-decoration: none;
        border-radius: 10px;
    }

</style>