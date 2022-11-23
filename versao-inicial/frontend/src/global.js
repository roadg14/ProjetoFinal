// Gerando Build para produção.
import Vue from 'vue'

export const userKey = '__knowledge_user' // Historico de acesso. chaves dos usuarios que vão fazer login ou se cadastrar.
export const baseApiUrl = 'http://localhost:3000' // Após alterar para build de produção // A porta 3000 é a porta do backend.

// Função para tratar o Erro.
export function showError(e) { 
    if(e && e.response && e.response.data) { // Essa é a forma de chamar o erro generico.
        Vue.toasted.global.defaultError({ msg : e.response.data })
    } else if(typeof e === 'string') { // e é igual a string se for, vai passa a mensagem para o msg:
        Vue.toasted.global.defaultError({ msg : e})
    }  else { // CASO NÃO SEJA NADA, PASSE APENSAR O ERRO.
        Vue.toasted.global.defaultError()
    }
}

export default { baseApiUrl, showError, userKey  }