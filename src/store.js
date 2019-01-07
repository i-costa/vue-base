import Vue from 'vue'
import Vuex from 'vuex'
import accountService from '@/_services/accountService'

Vue.use(Vuex)

const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'

export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem('token'),
    pending: false,
    userInfo: null
  },
  mutations: {
    [LOGIN] (state) {
      state.pending = true
    },
    [LOGIN_SUCCESS] (state) {
      state.isLoggedIn = true
      state.pending = false
    },
    [LOGOUT] (state) {
      state.isLoggedIn = false
    }
  },
  actions: {
    login ({ commit }, toSendInfo) {
      commit(LOGIN)
      accountService.loginUser({
        email: toSendInfo.form.email, password: toSendInfo.form.password
      }).then((response) => {
        console.log(response)
        if (response.data.status === 200) {
          localStorage.setItem('token', response.data.token)
          commit(LOGIN_SUCCESS)
          window.location.replace('/logged')
        }
      })
    },
    logout ({ commit }) {
      localStorage.removeItem('token')
      commit(LOGOUT)
      location.reload()
    }
  },
  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn
    }
  }
})
