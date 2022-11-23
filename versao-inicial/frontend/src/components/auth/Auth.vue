<!-- Essa Tela vai servi tanto pra cadastro quanto pra login.-->
<template>
    <div class="auth-content">
        <div class="auth-modal">
            <img src="@/assets/super-heroi.png" width="100" alt="Logo">
            <hr>
            <!-- Mostra o cadastro caso o showSignup for false vai mostra tela de login -->
            <div class="auth-title"> {{ showSignup ? 'Cadastro' : 'Login' }} </div>
            
            <!-- Esse input só vai aparecer quando o signup quando for no cadastro.  -->
            <input type="text" v-if="showSignup" v-model="user.name" placeholder="Nome"> <!-- Nome do Usuario -->
            <input type="text" v-model="user.email" name="email" placeholder="E-mail"> <!-- Email do Usuario-->
            <input type="password" v-model="user.password" name="password" placeholder="Senha"> <!-- Senha do Usuario -->
            <input type="password" v-if="showSignup" v-model="user.confirmPassword" placeholder="Confirme a Senha"> <!-- Confirmação de senha Usuario -->

            <!-- Botão de Registrar quando estiver no cadastro.  -->
            <button v-if="showSignup" @click="signup"> Registrar </button>

            <!-- Botão para fazer login. -->
            <button v-else @click="signin"> Entrar </button>

            <!-- Link para altenar quando for login e cadastro.-->
            <a href @click.prevent="showSignup = !showSignup">
                <span v-if="showSignup"> Já tem cadastro? Acesse o login </span> <!-- Se é Usuario faz Login. -->
                <span v-else> Não tem cadastro ? Registre-se aqui! </span> <!-- Se não tem cadastro vai para cadastro. -->
            </a>
        </div>
    </div>
</template>

<script>

import { baseApiUrl, showError, userKey } from '@/global' // Importando lá do global.js
import axios from 'axios'

export default {
    name: 'Auth',
    data: function() {
        return { // Adicionando uma Flag que vai ficar alternando entra a tela de cadastro e de login.
            showSignup: false, // Se ele estiver FALSE ele vai mostrar o LOGIN, se estiver TRUE ele vai mostrar o CADASTRO.
            user: {} // Aqui vai armezanar os usuarios, senhas, email tudo.
        }
    },
    methods: { // Os metodos de cadastro e login. signup e signin
        signin() { // Signin é responsavel por fazer login.
            axios.post(`${baseApiUrl}/signin`, this.user) // Base url do backend
                .then(res => { // Chama o Then para a resposta. 
                    this.$store.commit('setUser', res.data) // Setando ele na store. E setando o usuario.
                    // Quando salva na storege ele salvar como string, e JSON. vai persistir em string
                    localStorage.setItem(userKey, JSON.stringify(res.data)) // Caso ele saia e voltar ele vai poder recuperar o que foi feito. no localStore.
                    this.$router.push({ path: '/'}) // Após fazer login a tela vai ser mandada para o inicio do site.
                })
                .catch(showError) // Caso aconteça algum erro. Vai aparecer a mensagem.
        },
        signup() { // Signup é Responsavel por fazer o cadastro.
            axios.post(`${baseApiUrl}/signup`, this.user) // Base url do backend
                .then(() => { // Nesse caso quando for feito o cadastro vai aparecer a mensagem de sucesso.
                    this.$toasted.global.defaultSuccess() // Mensagem de sucesso quando for feito o cadastro.
                    this.user = {} // Deixando vazio o user. para ele fica pronto para fazer login.
                    this.showSignup = false // Assim que terminar o tela de login vai aparecer em seguida. Mundando a tela para login.
                })
                .catch(showError)
        }

    }
}
</script>

<style>
    .auth-content {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .auth-modal {
        background-color: #fff;
        width: 350px;
        padding: 35px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 20px;
    }
    .auth-title {
        font-size: 1.2rem;
        font-weight: 100;
        margin-top: 10px;
        margin-bottom: 15px;
    }

    .auth-modal input {
        border: 1px solid #BBB;
        border-radius: 20px;
        width: 100%;
        margin-bottom: 15px;
        padding: 3px 8px;
        outline: none;
    }

    .auth-modal button {
        border-radius: 20px;
        align-self: flex-end;
        background-color: #2460ae;
        border: none;
        color: #FFF;
        padding: 5px 15px;
    }

    .auth-modal a {
        margin-top: 35px;
    }

    .auth-modal hr {
        border: 0;
        width: 100%;
        height: 1px;
        background: linear-gradient(to right,
            rgba(120, 120, 120, 0),
            rgba(120, 120, 120, 0.75),
            rgba(120, 120, 120, 0)
            );
    }

    
</style>