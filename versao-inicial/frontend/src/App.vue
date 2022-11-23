<template>
	<!-- hider-menu vai esconder o isMenuVisible ou quando não tiver usuarios logados. -->
	<div id="app" :class="{'hide-menu': !isMenuVisible || !user}"> <!-- Fazendo o grid sumi quando o menu estiver false tambem.-->
		<Header title="Douglas - Projeto Base de Conhecimento" 
			:hideToggle="!user" 
			:hideUserDropdown="!user" /> <!--  '!user' -> so quando o usuario estiver logado para mostrar. Para aceitar esse hidetoggle precisa coloca os dois pontos -> : para intepretar. -->
		<Menu v-if="user" /> <!-- Só mostrar quando o usuario estiver Logado. -->
		<Loading v-if="validatingToken" /> <!-- Se estiver validando o token vai mostrar o loandig -->
		<Content v-else /> <!-- Se não estiver validando o token ai sim vai mostrar o content -->
		<Footer />
	</div>
</template>

<script>
	// Importando todos os arquivos que estão na pasta template.
	import axios from 'axios'
	import { baseApiUrl, userKey } from '@/global'
	import { mapState } from 'vuex'

	import Header from "./components/template/Header" // . É para se referencia o src que é uma pasta.
	import Menu from "./components/template/Menu"
	import Content from "./components/template/Content"
	import Footer from "./components/template/Footer"
	import Loading from "./components/template/Loading"


export default {
	name: "App",
	components: { Header, Menu, Content, Footer, Loading }, // Declando os componentes que serão usados.
	computed: mapState(['isMenuVisible', 'user']),
	data: function() {
		return { // Validando o token no Backend. Se estiver OK.
			validatingToken: true
		}
	},
	methods: {
		async validateToken() {
			this.validatingToken = true // Validar o token

			const json = localStorage.getItem(userKey) // Pegando o Json que esta armazenado no LocalStorage.
			const userData = JSON.parse(json) // Transformando em JSON. 
			this.$store.commit('setUser', null) // Inicialmente deixando o setUser para null.

			if(!userData) { // Se não estiver estiver usuario tambem vai da false e voltar para tela login.
				this.validatingToken = false //
				this.$router.push({ name: 'auth' }) // Encaminhar para a tela de autenticação. Login.
				return 
			}

			// Se o userDada estiver setado
			//
			const res = await axios.post(`${baseApiUrl}/validateToken`, userData)
			if(res.data) { 
				this.$store.commit('setUser',userData) // Setando o usuario na LocalStorage.
			// mq.js 
			if(this.$mq === 'xs' || this.$mq === 'sm') {
				this.$store.commit('toggleMenu', false)
			}
			
			} else {
				localStorage.removeItem(userKey) // Removendo do LocalStorage. 
				this.$router.push({ name: 'auth' }) // Se não for validado o token, ele vai voltar para a tela de login.
			}
			this.validatingToken = false // Ou vai esta dentro da aplicação ou ele vai esta fora.
		}
	},
	created() { // Chamando a função.
		this.validateToken()
	}


}
</script>

<style>
	* { 
		font-family: "Lato", sans-serif; /* font referenciada em public/index.html */
	}

	body {
		margin: 0; /* Retirando toda a margin do SiteQ*/
	}

	#app {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale; /* suaviza a font na hora de renderizar aplicação */

		height: 100vh;
		display: grid;
		grid-template-rows: 50px 1fr 40px;
		grid-template-columns: 260px 1fr;
		grid-template-areas: 
			"header header"
			"menu content"
			"menu footer";
	}

	#app.hide-menu { /* Esta ligado no :class="{'hide-menu': !isMenuVisible}" */
		grid-template-areas: 
			"header header"
			"content content"
			"footer footer";
	}
</style>