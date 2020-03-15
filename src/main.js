import Vue from 'vue'
import App from './App.vue'
// import createRouter from './router'
import vuetify from './plugins/vuetify'
import store from './store/index'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
axios.defaults.withCredentials = true

Vue.use(VueAxios, axios)

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
