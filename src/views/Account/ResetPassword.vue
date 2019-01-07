<template>
  <section class="reset-password">
    <div class="container">
      <div class="row" v-if="!submitSuccess">
        <div class="col-sm-12">
          <h2 class="text-center">Reset password</h2>
          <form @submit.prevent="resetPassword()">
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
              <button type="text">Reset password</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col-sm-12 text-center">
          <h2>Your new password was set.</h2>
          <router-link to="/login">Login now</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import accountService from '@/_services/accountService'

export default {
  name: 'reset-password',
  data () {
    return {
      form: {
        email: null,
        password: null
      },
      submitted: false,
      generalErrors: null,
      submitSuccess: null
    }
  },
  methods: {
    async resetPassword () {
      this.submitted = true
      this.$validator.validate().then(async valid => {
        if (valid) {
          const response = await accountService.resetPassword({ toSendInfo: this.form })
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
