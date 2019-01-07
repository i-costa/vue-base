<template>
  <section class="resend-activation-email">
    <div class="container">
      <div class="row" v-if="!submitSuccess">
        <div class="col-sm-12">
          <h2 class="text-center">Resend activation e-mail</h2>
          <form @submit.prevent="resendActivationEmail()">
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
                <button type="submit">Continue</button>
              </div>
            </div>
          </form>
        </div>
        <div class="col-sm-12">
          <p class="text-center">
            <router-link to="/register">Register now.</router-link><br>
            <router-link to="/login">Login now.</router-link><br>
            <router-link to="/resend-activation-email">Re-send activation e-mail.</router-link>
          </p>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-sm-12 text-center">
          <h2>Activation e-mail was sent.</h2>
          <router-link to="/login">Login now.</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import accountService from '@/_services/accountService'
export default {
  name: 'resend-activation-email',
  data () {
    return {
      form: {
        email: null
      },
      submitted: false,
      generalErrors: null,
      submitSuccess: null
    }
  },
  methods: {
    async resendActivationEmail () {
      this.submitted = true
      this.$validator.validate().then(async valid => {
        if (valid) {
          const response = await accountService.resendActivationEmail({ toSendInfo: this.form })
          if (response.data.status === 200) {
            this.submitSuccess = true
          } else {
            this.generalErrors = response.data.message
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
 @import "../../assets/sass/modules/forms.scss";
</style>
