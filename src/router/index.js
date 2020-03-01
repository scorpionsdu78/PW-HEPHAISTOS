import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import Activity from '../components/Activity.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: require('../components/HelloWorld.vue').default
  },
  {
    path: '/activity',
    name: 'Activity',
    component: require('../components/Activity.vue').default
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
