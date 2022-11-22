<template>
	<!-- hider-menu vai esconder o isMenuVisible ou quando não tiver usuarios logados. -->
	<div id="app" :class="{'hide-menu': !isMenuVisible || !user}"> <!-- Fazendo o grid sumi quando o menu estiver false tambem.-->
		<Header title="Douglas - Projeto Base de Conhecimento" 
			:hideToggle="!user" :hideUserDropdown="!user"/> <!--  '!user' -> so quando o usuario estiver logado para mostrar. Para aceitar esse hidetoggle precisa coloca os dois pontos -> : para intepretar. -->
		<Menu v-if="user" /> <!-- Só mostrar quando o usuario estiver Logado. -->
		<Content />
		<Footer />
	</div>
</template>

<script>
	// Importando todos os arquivos que estão na pasta template.
	import { mapState } from 'vuex'
	import Header from "./components/template/Header" // . É para se referencia o src que é uma pasta.
	import Menu from "./components/template/Menu"
	import Content from "./components/template/Content"
	import Footer from "./components/template/Footer"


export default {
	name: "App",
	components: { Header, Menu, Content, Footer }, // Declando os componentes que serão usados.
	computed: mapState(['isMenuVisible', 'user'])

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