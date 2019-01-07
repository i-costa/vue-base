import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: window.location.port ? 'http://localhost:8081/api/' : window.location.protocol + '//' + window.location.host + '/api/'
  })
}
