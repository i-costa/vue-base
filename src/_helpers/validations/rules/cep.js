const axios = require('axios')

async function validate (value) {
  let result
  if (value.length === 9) {
    await axios.get('https://viacep.com.br/ws/' + value + '/json/')
      .then(response => {
        if (response.data.erro === true) {
          result = false
        } else {
          result = true
        }
      })
    return result
  }
  return false
}

const validator = {
  getMessage (field, args) {
    return 'Invalid CEP'
  },
  validate (value, args) {
    return validate(value)
  }
}

export default validator
