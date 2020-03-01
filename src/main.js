import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

axios.defaults.withCredentials = true

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
