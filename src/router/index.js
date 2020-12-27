import Vue from 'vue'
import store from '../store/index'
import VueRouter from 'vue-router'
import Home from '../views/__Home.vue'
import Dashboard from '../views/app/__Dashboard.vue'
import Main from '../views/app/Main.vue'

Vue.use(VueRouter)

// component: () => import('../views/Component.vue')
// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.

const routes = [
  {
    path: '/',
    name: 'App',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/auth/Register.vue')
  },
  {
    path: '/recover-password',
    name: 'RecoverPassword',
    component: () => import('../views/auth/RecoverPassword.vue')
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import('../views/auth/ResetPassword.vue')
  },
  {
    path: '/app',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      store.dispatch('checkToken')
        .then(r => { next() })
        .catch(e => { next('/login') })
    },
    children: [
      {
        path: '/app/',
        component: Main,
        meta: { title: 'Dashboard' }
      },
      {
        path: '/app/settings',
        component: () => import('../views/app/Settings.vue'),
        meta: { title: 'Configurações' }
      },
      {
        path: '/app/users',
        component: () => import('../views/app/Users.vue'),
        meta: { title: 'Usuários' }
      },
      {
        path: '/app/residents',
        component: () => import('../views/app/Residents.vue'),
        meta: { title: 'Residentes' }
      },
      {
        path: '/app/apartments',
        component: () => import('../views/app/Apartments.vue'),
        meta: { title: 'Apartamentos' }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
