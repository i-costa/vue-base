<template>
  <section class="forgot-password">
    <div class="container">
      <div class="row" v-if="!submitSuccess">
        <div class="col-sm-12">
          <h2 class="text-center">Forgot Password</h2>
          <form @submit.prevent="forgotPassword()">
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
          <h2>E-mail was sent with link to reset password</h2>
          <router-link to="/login">Login now.</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import accountService from '@/_services/accountService'
export default {
  name: 'forgot-password',
  data () {
    return {
      form: {
        email: null,
        token: $route.query.token
      },
      submitted: false,
      generalErrors: null,
      submitSuccess: null
    }
  },
  methods: {
    async forgotPassword () {
      this.submitted = true
      this.$validator.validate().then(async valid => {
        if (valid) {
          const response = await accountService.forgotPassword({ toSendInfo: this.form })
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
