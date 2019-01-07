<template>
  <section class="register">
    <div class="container">
      <div class="row" v-if="!submitSuccess">
        <div class="col-sm-12">
          <h2 class="text-center">Register</h2>
          <form @submit.prevent="register()">
            <div v-if="submitted && generalErrors" class="invalid-feedback text-center">{{generalErrors}}</div>
            <div class="form-group row">
              <div class="form-field col-sm-12">
                <label>E-mail</label>
                <input type="text" name="email" placeholder="E-mail" v-model="form.email" v-validate="'required|email'" :class="{'is-invalid': submitted && errors.has('email')}">
                <div v-if="errors.first('email')" class="invalid-feedback">{{ errors.first('email') }}</div>
              </div>
            </div>
            <div class="form-group row">
              <div class="form-field col-sm-12">
                <label>Password</label>
                <input type="password" name="password" placeholder="Password" v-model="form.password" v-validate="'required'" :class="{'is-invalid': submitted && errors.has('password')}">
                <div v-if="errors.first('password')" class="invalid-feedback">{{ errors.first('password') }}</div>
              </div>
            </div>
            <div class="form-group row">
              <div class="form-field col-sm-12">
                <label>First name</label>
                <input type="text" name="firstName" placeholder="First name" v-model="form.firstName">
              </div>
            </div>
            <div class="form-group row">
              <div class="form-field col-sm-12">
                <label>Birth date</label>
                <input type="text" name="birthDate" placeholder="Birthdate" v-model="form.birthDate" v-mask="'##/##/####'">
              </div>
            </div>
            <div class="form-group row">
              <div class="form-field col-sm-12">
                <label>CPF</label>
                <input type="text" name="cpf" placeholder="CPF" v-model="form.cpf" v-validate="{required: false, min: 14, cpf: true}" :class="{'is-invalid': submitted && errors.has('cpf')}" v-mask="'###.###.###-##'"/>
                <div v-if="submitted && errors.has('cpf')" class="invalid-feedback">{{ errors.first('cpf') }}</div>
              </div>
            </div>
            <div class="form-group row">
              <div class="form-field col-sm-12">
                <label>CEP</label>
                <input type="text" name="cep" placeholder="CEP"  v-validate="{required: false, min: 9, cep: true}" v-model="form.cep" :class="{'is-invalid': submitted && errors.has('cep')}" v-mask="'#####-###'"/>
                <div v-if="submitted && errors.has('cep')" class="invalid-feedback">{{ errors.first('cep') }}</div>
              </div>
            </div>
            <div class="form-group row">
              <div class="form-field col-sm-12">
              <button type="text">Register</button>
              </div>
            </div>
          </form>
        </div>
        <div class="col-sm-12">
          <p class="text-center">
            Already have an account?
            <router-link to="/login">Login now</router-link>.
          </p>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-sm-12 text-center">
          <h2>You registered succesfully!</h2>
          <p>We sent an e-mail to verify your account.</p>
          <router-link to="/login">Login now</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import accountService from '@/_services/accountService'
import { mask } from 'vue-the-mask'

export default {
  name: 'register',
  directives: { mask },
  data () {
    return {
      form: {
        email: null,
        password: null,
        firstName: null,
        birthDate: null,
        cpf: null,
        cep: null
      },
      submitted: false,
      generalErrors: null,
      submitSuccess: null
    }
  },
  methods: {
    async register () {
      this.submitted = true
      this.$validator.validate().then(async valid => {
        if (valid) {
          const response = await accountService.registerUser({ toSendInfo: this.form })
          if (response.data.status === 200) {
            // this.$router.push({ name: 'login' })
            this.submitSuccess = true
          } else {
            this.generalErrors = response.data.message
          }
        }
      })
    }
  },
  mounted () {
    // this.getUser()
  }
}
</script>

<style lang="scss">
 @import "../../assets/sass/modules/forms.scss";
</style>
