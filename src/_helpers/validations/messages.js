const dict = {
  custom: {
    email: {
      required: 'The field is required',
      email: 'This e-mail is invalid'
    },
    password: {
      required: 'The field is required'
    },
    firstName: {
      required: 'The field is required'
    },
    confirmPassword: {
      required: 'The field is required'
    },
    cpf: {
      required: 'The field is required',
      cpf: 'The CPF is invalid'
      // min: 'O campo CPF precisa ter 14 caracteres'
    },
    phone: {
      required: 'The field is required'
      // min: 'O campo precisa ter no mínimo 14 caracteres',
      // max: 'O campo precisa ter no máximo 15 caracteres'
    },
    cep: {
      required: 'The field is required',
      cep: 'The CEP is invalid'
      // min: 'Digite um CEP válido'
    },
    genre: {
      required: 'The field is required'
    },
    birthdate: {
      required: 'The field is required'
      // min: 'Digite uma data válida'
    },
    cpfcnpj: {
      required: 'The field is required'
    }
  }
}

module.exports = dict
