import Vue from 'vue'
import Toasted from 'vue-toasted' //Import que tambem tem que estar no packge.json

Vue.use(Toasted, {
    iconPack: 'fontawesome', // Biclioteca de icones.
    duration: 3000 // Duração da mensagem.
})

Vue.toasted.register( // A mensagem de Sucesso.
    'defaultSuccess',
    payload => !payload.msg ? 'Operação realizada com sucesso!' : payload.msg,
    { type: 'success', icon: 'check' }
)

Vue.toasted.register( // A mensagem de erro.
    'defaultError',
    payload => !payload.msg ? 'Opss.. Erro inesperado.' : payload.msg,
    { type: 'error', icon: 'times' }
)