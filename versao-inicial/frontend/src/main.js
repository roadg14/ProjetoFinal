import "font-awesome/css/font-awesome.css" // Tem que importa essa font-awesome. para que a seta de desce o menu apareça.
import Vue from 'vue'

import App from './App'

import './config/bootstrap' // Importando o Bootstrap.js
import './config/msgs' // Importando do arquivo msgs.js
import store from './config/store' // Importando de store.js
import router from './config/router' // Importando route.js as rotas. 

Vue.config.productionTip = false

// Temporario!
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkRvdWdsYXMgUm9kcmlndWVzIiwiZW1haWwiOiJkb3VnbGFzZ2MxM0BnbWFpbC5jb20iLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjY4NzEzMjY2LCJleHAiOjE2Njg5NzI0NjZ9.zfdC8t5UN1tuCr1pdJVOYvdLyG6e1m1UPdE0MVS9-qI'

new Vue({
  store, // Associando ela para funcionar. // store pode ser compartilhada entre componentes
  router, // Colocando a rotas para funcionar. // router pode ser compartilhada entre componentes
  render: h => h(App)
}).$mount('#app')