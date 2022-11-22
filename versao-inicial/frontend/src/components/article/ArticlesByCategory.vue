<template>
    <div class="articles-by-category">
        <PageTitle icon="fa fa-folder-o"
            :main="category.name" sub="Categoria" />
        <!-- Vai mostrar os artigos numa lista ordenada -->
        <ul>
            <li v-for="article in articles" :key="article.id">
                <ArticleItem :article="article" />
            </li>
        </ul>
        <hr>
        <div class="load-more">
            <button v-if="loadMore"
                class="btn btn-lg btn-outline-primary"
                @click="getArticles"> Carregar mais arquivos
            </button>
        </div>
    </div>
</template>

<script>

import { baseApiUrl } from '@/global'
import axios from 'axios'
import PageTitle from '../template/PageTitle'
import ArticleItem from './ArticleItem'


export default {
    name: 'ArticlesByCategory',
    components: { PageTitle, ArticleItem },
    data: function() {
        return {
            category: {}, // As catefgorias
            articles: [], // Os Artigos.
            page: 1, // Paginas.
            loadMore: true // Botão para carregas mais
        }
    },
    methods: {
        getCategory() { // Pegando os id das categorias
            const url = `${baseApiUrl}/categories/${this.category.id}`
            axios(url).then(res => this.category = res.data) // o axios vai fazer essa requisição
        },
        getArticles() { // Buscando as listas dos artigos.
            const url = `${baseApiUrl}/categories/${this.category.id}/articles?page=${this.page}`
            axios(url).then(res => {
                this.articles = this.articles.concat(res.data) // Acrecentando sempre mais artigos.
                this.page++ // Sempre acrecentando novas paginas.
                if(res.data.length === 0) this.loadMore = false // Se estiver um retorno vazio vai setar o botão mais artigos para falso.
            })
        }
    },
    watch: {
        $route(to) { // Vai fica monitorando as rotas. // Que esta no arquivo Menu.vue em template
            this.category.id = to.params.id // Para que URL ele vai quando for selecionado.
            this.articles = [] // Zerando a Array de arquivos.
            this.page = 1
            this.loadMore = true
            this.getCategory()
            this.getArticles()
        }
    },
    mounted() {
        // Sentando com ID.
        this.category.id = this.$route.params.id // Setando o ID na url quando for clicado para já saber quando é o artigo. 
        this.getCategory() // Completando e chamando a categoria.
        this.getArticles()
    }
}
</script>

<style>
    .articles-by-category ul {
        list-style-type: none; /* Retirando as bolinas das listas. */
        padding: 0;
    }
    .articles-by-category .load-more {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25px;
    }
</style>