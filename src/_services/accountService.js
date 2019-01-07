import Api from '@/_services/Api'

export default {
  fetchUsers () {
    return Api().get('account')
  },
  loginUser (params) {
    return Api().post('account/login/', { params })
  },
  registerUser (params) {
    return Api().post('account/register', { params })
  },
  activateAccount (params) {
    return Api().get('account/activateAccount/' + params)
  },
  forgotPassword (params) {
    return Api().post('account/forgotPassword/', { params })
  },
  resetPassword (params) {
    return Api().post('account/resetPassword/', { params })
  },
  resendActivationEmail (params) {
    return Api().post('account/resendActivationEmail/', { params })
  }
}
