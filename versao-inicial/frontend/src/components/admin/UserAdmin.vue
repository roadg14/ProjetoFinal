<template>
    <div class="user-admin">
      <b-form>
        <input type="hidden" id="user-id" v-model="user.id" />
  
        <b-row> <!-- O formulario pedindo name e email-->
          <b-col md="6" sm="12">
            <b-form-group label="Nome:" label-form="user-name">
              <b-form-input
                id="user-name"
                type="text"
                v-model="user.name"
                required
                :readonly="mode === 'remove'"
                placeholder="Informe o Nome do Usuário..."
              />
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="E-mail:" label-form="user-email">
              <b-form-input
                id="user-email"
                type="text"
                v-model="user.email"
                required
                :readonly="mode === 'remove'"
                placeholder="Informe o E-mail do Usuário..."
              />
            </b-form-group>
          </b-col>
        </b-row>
  
        <!-- Uma caixa para marca se for administrador ou não-->
        <b-form-checkbox 
          id="user-admin"
          v-model="user.admin"
          class="mt-3 mb-3"
          v-show="mode === 'save'"
          >Administrador</b-form-checkbox
        >
  
        <!-- O Formulario da senha, e confirmação da senha.-->
        <b-row v-show="mode === 'save'">
          <b-col md="6" sm="12">
            <b-form-group label="Senha:" label-form="user-password">
              <b-form-input
                id="user-password"
                type="password"
                v-model="user.password"
                required
                placeholder="Informe a Senha do Usuário..."
              />
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group
              label="Confirmar Senha:"
              label-form="user-confirm-password"
            >
              <b-form-input
                id="user-confirm-password"
                type="password"
                v-model="user.confirmPassword"
                required
                placeholder="Confirme a senha do Usuário..."
              />
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col xs="12">
            <!-- Bottão para Salvar.-->
            <b-button variant="primary" v-if="mode === 'save'" @click="save"
              >Salvar</b-button>
            <!-- Bottão para Exluir.-->
            <b-button variant="danger" v-if="mode === 'remove'" @click="remove"
              >Excluir</b-button>
            <!-- Bottão para Cancelar.-->
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
          </b-col>
        </b-row>
      </b-form>
      <hr />

      <!-- Botões para Editar e Excluir-->
      <b-table hover striped :items="users" :fields="fields">
        <template slot="actions" slot-scope="data">
          <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
            <i class="fa fa-pencil"></i>
          </b-button>
          <b-button variant="danger" @click="loadUser(data.item, 'remove')">
            <i class="fa fa-trash"></i>
          </b-button>
        </template>
      </b-table>
    </div>
  </template>
    
  <script>
  import { baseApiUrl, showError } from "@/global";
  import axios from "axios";
  export default {
    name: "UserAdmin",
    data: function () {
      return {
        mode: "save", // Put, Post ou Delete
        user: {},
        users: [], // Será renderizado na tabela
        fields: [
          { key: "id", label: "Código", sortable: true },
          { key: "name", label: "Nome", sortable: true },
          { key: "email", label: "E-mail", sortable: true },
          {
            key: "admin",
            label: "Administrador",
            sortable: true,
            formatter: (value) => (value ? "Sim" : "Não"),
          },
          { key: "actions", label: "Ações" },
        ],
      };
    },
    methods: {
      loadUsers() {
        const url = `${baseApiUrl}/users`;
        axios.get(url).then((res) => {
          this.users = res.data;
        });
      },
      reset() {
        this.mode = "save";
        this.user = {};
        this.loadUsers();
      },
      save() {
        // Estiver setado método da requisição será Put, se não Post
        const method = this.user.id ? "put" : "post";
        const id = this.user.id ? `/${this.user.id}` : "";
        axios[method](`${baseApiUrl}/users${id}`, this.user)
          .then(() => {
            this.$toasted.global.defaultSuccess();
            this.reset();
          })
          .catch(showError);
      },
      remove() {
        const id = this.user.id;
        axios
          .delete(`${baseApiUrl}/users/${id}`)
          .then(() => {
            this.$toasted.global.defaultSuccess();
            this.reset();
          })
          .catch(showError);
      },
      loadUser(user, mode = "save") { // Botões para Exluir e Editar.
        this.mode = mode;
        this.user = { ...user };
      },
    },
    mounted() {
      // Quando componente for carregado
      this.loadUsers();
    },
  };
  </script>
    
  <style>
  </style>