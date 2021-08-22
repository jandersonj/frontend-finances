import Vue from 'vue'
import VueRouter from 'vue-router'

import Lancamento from '../views/Records.vue'
import axios from 'axios'
Vue.use(VueRouter)

const Auth = (to, from, next) => {
  if (localStorage.getItem("token") != undefined) {

    let req ={
      headers:{
        Authorization : `${localStorage.getItem("token")}`
      }
    }
    axios.post("https://api-financess.herokuapp.com/api/user/validate", {}, req)
    .then(res => {
      next()
    }).catch(err => {
      console.log(err.response);
      next("/login")
    })

   next()

  } else {

   next('/login')
  }

}
const Logout = (to,from,next) => {
  localStorage.removeItem("token")
  localStorage.removeItem("uuid")
  next('/login')
}

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: ()=> import('../views/Login.vue')
  },
  {
    path: '/dashboard',
    component: ()=> import('../views/Dashboard.vue'),
    beforeEnter: Auth,
  },
  { 
    path: '/lancamentos', 
    component: Lancamento, 
    beforeEnter: Auth,
  },
  { 
    path: '/sair', 
    beforeEnter: Logout,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
