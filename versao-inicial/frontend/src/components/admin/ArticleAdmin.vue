<template>
    <div class="article-admin">
        <b-form>
            <input id="article-id" type="hidden" v-model="article.id" />

            <!-- Formulario para o Nome do Artigo -->
            <b-form-group label="Nome:" label-for="article-name">
                <b-form-input id="article-name" type="text"
                    v-model="article.name" required
                    :readonly="mode === 'remove'"
                    placeholder="Informe o Nome do Artigo..." />
            </b-form-group>

            <!-- Formulario para o Descrição do Artigo -->
            <b-form-group label="Descrição:" label-for="article-description">
                <b-form-input id="article-description" type="text"
                    v-model="article.description" required
                    :readonly="mode === 'remove'"
                    placeholder="Informe a Descrição do Artigo..." />
            </b-form-group>

            <!-- Formulario para o Imagem do Artigo -->
            <b-form-group v-if="mode === 'save'" label="Imagem (URL):" label-for="article-imageUrl">
                <b-form-input id="article-imageUrl" type="text"
                    v-model="article.imageUrl" required
                    :readonly="mode === 'remove'"
                    placeholder="Informe a URL da Imagem..." />
            </b-form-group>

            <!-- As categorias que serão colocadas no CategoryAdmin.vue -->
            <b-form-group v-if="mode === 'save'" label="Categoria:" label-for="article-categoryId">
                <b-form-select  id="article-categoryId"
                    :options="categories" v-model="article.categoryId"/>
            </b-form-group>

            <!-- Quem Criou o artigo, que vai ser algum usuario. -->
            <b-form-group v-if="mode === 'save'" label="Autor:" label-for="article-userId">
                <b-form-select id="article-userId"
                    :options="users" v-model="article.userId"/>
            </b-form-group>

            <!-- Onde vai poder escrever o conteudo -->
            <b-form-group v-if="mode === 'save'" label="Conteúdo:" label-for="article-content">
                <VueEditor v-model="article.content"
                    placeholder="Informe o Conteúdo do Artigo..." />
            </b-form-group>

            <!-- Botões para Salvar e Excluir.-->
            <b-button variant="primary" v-if="mode === 'save'"
                @click="save">Salvar</b-button>
            <b-button variant="danger" v-if="mode === 'remove'"
                @click="remove">Excluir</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-form>
        <hr>
        
        <!-- Botões para Editar e Excluir-->
        <b-table hover striped :items="articles" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadArticle(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadArticle(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
        <b-pagination size="md" v-model="page" 
            :total-rows="count" :per-page="limit" /> <!-- Limitadores de paginas. -->
    </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
export default {
    name: 'ArticleAdmin',
    components: { VueEditor },
    data: function() {
        return {
            mode: 'save',
            article: {},
            articles: [],
            categories: [], // Vincular ao um artigo.
            users: [], // Vincular ao um usuario.
            page: 1, // Uma pagina de cada
            limit: 0, // Limitador de paginas
            count: 0,
            fields: [ // Mostra os arquivos que tem.
                { key: 'id', label: 'Código', sortable: true },
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'description', label: 'Descrição', sortable: true }, // Descrição
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    methods: {
        loadArticles() { // Função que vai ler os Artigos que já estão no banco de dados!
            const url = `${baseApiUrl}/articles?page=${this.page}`
            axios.get(url).then(res => {
                this.articles = res.data.data
                this.count = res.data.count
                this.limit = res.data.limit
            })
        },
        reset() {
            this.mode = 'save'
            this.article = {}
            this.loadArticles()
        },
        save() {
            const method = this.article.id ? 'put' : 'post'
            const id = this.article.id ? `/${this.article.id}` : ''
            axios[method](`${baseApiUrl}/articles${id}`, this.article)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.article.id
            axios.delete(`${baseApiUrl}/articles/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadArticle(article, mode = 'save') { // Função que ler os artigos.
            this.mode = mode
            // this.article = { ...article }
            axios.get(`${baseApiUrl}/articles/${article.id}`)
                .then(res => this.article = res.data)
        },
        loadCategories() { // Função que ver as categorias.
            const url = `${baseApiUrl}/categories`
            axios.get(url).then(res => {
                this.categories = res.data.map(category => {
                    return { value: category.id, text: category.path }
                })
            })
        },
        loadUsers() { // Função Que ler todos os usuarios.
            const url = `${baseApiUrl}/users`
            axios.get(url).then(res => {
                this.users = res.data.map(user => {
                    return { value: user.id, text: `${user.name} - ${user.email}` }
                })
            })
        }
    },
    watch: { // Paginações.
        page() {
            this.loadArticles()
        }
    },
    mounted() {
        this.loadArticles()
        this.loadCategories()
        this.loadUsers()
    }
}
</script>

<style>
</style>