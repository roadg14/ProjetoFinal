<template>
    <aside class="menu" v-show="isMenuVisible">
        <div class="menu-filter">
            <i class="fa fa-search fa-lg"></i>
            <input type="text" placeholder="Digite para filtrar..."
                v-model="treeFilter" class="filter-field">
        </div>
        <Tree :data="treeData" :options="treeOptions"
            :filter="treeFilter" ref="tree" />
    </aside> <!-- V-show -> Está ligado na função computerd. -->
</template>

<script>

// Importando uma Função que vai ser responsavel por mapea um atributo da store dentro do component.
import { mapState } from 'vuex'
import Tree from 'liquor-tree'
import { baseApiUrl } from '@/global' // Acessando os serviços do backend
import axios from 'axios'

export default {
    name: 'Menu',
    components: { Tree },
    computed: mapState(['isMenuVisible']), // Mapeia atributo da store dentro do componente // Essa função que vai fazer sumir o Menu. Esta em Header.vue e Store.js que faz com que ele suma.
    data: function() {
        return {
            treeFilter: '', // Filtro da pesquisa. 
            treeData: this.getTreeData(),
            treeOptions: { // Alterando os nome que vão aparecer na arvore.
                propertyNames: { 'text': 'name' },
                filter: { emptyText: 'Categoria não encontrada' } // Caso não encontre do filtro de pesquisa aparecer essa mensagem.
            }
        }
    },
    methods: {
        getTreeData() { // Indo pegar a arvore das categorias e artigos.
            const url = `${baseApiUrl}/categories/tree`
            return axios.get(url).then(res => res.data)
        },
        onNodeSelect(node) { // Função de quando selecionar no menu e abrir o artigo.
            this.$router.push({ // Quando for selecionado vai navegar para o id que foi escolhido.
                name: 'articlesByCategory',
                params: { id: node.id }
            })
             // mq.js
            if(this.$mq === 'xs' || this.$mq === 'sm') {
                this.$store.commit('toggleMenu', false)
            }
        }
    },
    mounted() { //  Para cada nó da arvore vai ser colocado esse node:selected
        this.$refs.tree.$on('node:selected', this.onNodeSelect)
    },
}
</script>

<style>
    .menu {
        grid-area: menu;
        background: linear-gradient(to right, #232526, #414345);

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .menu a,
    .menu a:hover {
        color: #fff;
        text-decoration: none;
        border: 25px
    }

    .menu .tree-node.selected > .tree-content, /* Esse CSS seleciona quando for clicado  */
    .menu .tree-node .tree-content:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    .tree-arrow.has-child {
        filter: brightness(2);
    }

    .menu .menu-filter {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px;
        padding-bottom: 8px;
        border-bottom: 1px solid #AAA;
    }
    .menu .menu-filter i {
        color: #AAA;
        margin-right: 10px;
    }
    .menu input {
        color: #CCC;
        font-size: 1.2rem;
        border: 0;
        outline: 0;
        width: 100%;
        background: transparent;
    }
    .tree-filter-empty {
        color: #CCC;
        margin-left: 25px;
        font-size: 1.1rem;
    }
</style>