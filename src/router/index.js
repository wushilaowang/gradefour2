import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const Word = () => import('../views/Word')

  const routes = [
  {
    path: '/',
    redirect: 'word'
  },
  {
    path: '/word',
    component: Word
  }
]

const router = new VueRouter({
  routes
})

export default router
