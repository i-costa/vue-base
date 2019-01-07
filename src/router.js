import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */'./views/Account/Register.vue')
    },
    {
      path: '/activate-account',
      name: 'activate-account',
      component: () => import(/* webpackChunkName: "activate-account" */'./views/Account/ActivateAccount.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */'./views/Account/Login.vue')
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import(/* webpackChunkName: "forgot-password" */'./views/Account/ForgotPassword.vue')
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import(/* webpackChunkName: "reset-password" */'./views/Account/ResetPassword.vue')
    },
    {
      path: '/resend-activation-email',
      name: 'resend-activation-emai',
      component: () => import(/* webpackChunkName: "resend-activation-emai" */'./views/Account/ResendActivationEmail.vue')
    },
    {
      path: '/logged',
      name: 'logged',
      meta: { loggedOnly: true },
      component: () => import(/* webpackChunkName: "logged" */'./views/Logged.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  let isLogged = store.getters.isLoggedIn
  console.log('Usuario está logado? ' + isLogged)
  if (to.matched.some(record => record.meta.loggedOnly)) {
    if (isLogged === true) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router
