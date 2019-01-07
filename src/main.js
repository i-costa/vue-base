import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

// Form/inputs validation
import VeeValidate, { Validator } from 'vee-validate'
import CpfValidator from './_helpers/validations/rules/cpf.js'
import CepValidator from './_helpers/validations/rules/cep.js'
const dict = require('./_helpers/validations/messages.js')
Validator.localize('en', dict)
Validator.extend('cpf', CpfValidator)
Validator.extend('cep', CepValidator)
Vue.use(VeeValidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
