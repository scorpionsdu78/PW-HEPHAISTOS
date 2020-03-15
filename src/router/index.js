import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

// import axios from 'axios'

Vue.use(VueRouter)

async function beforeEnter (_to, _from, next) {
  if (!store.getters['user/isAuthenticated']) {
    await store.dispatch('user/fetchUser')
  }
  if (store.getters['user/isAuthenticated']) {
    next()
    return
  }
  next('/login')
}
const routes = [
  {
    path: '/login',
    name: 'Home',
    component: require('../components/HelloWorld.vue').default
  },
  {
    path: '/activity',
    name: 'Activity',
    component: require('../components/Activity.vue').default,
    beforeEnter
  },
  {
    path: '/choose',
    name: 'ChoosePage',
    component: require('../components/ChoosePage.vue').default
  },
  {
    path: '/tp/:id/exercise/:exerciseId',
    name: 'Tp',
    component: require('../components/Tp.vue').default
  }
]

export default new VueRouter({
  routes
})
