<template>
  <section class="login">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h2 class="text-center">Login</h2>
          <form @submit.prevent="login()">
            <div class="form-group row">
              <div class="form-field col-sm-12">
                <label>E-mail</label>
               <input type="text" placeholder="E-mail" v-model="form.email">
              </div>
            </div>
            <div class="form-group row">
              <div class="form-field col-sm-12">
                <label>Password</label>
                <input type="password" placeholder="Password" v-model="form.password">
                <router-link to="/forgot-password">Forgot password?</router-link>
              </div>
            </div>
            <div class="form-group row">
              <div class="form-field col-sm-12">
                <button type="submit">Login</button>
              </div>
            </div>
          </form>
        </div>
        <div class="col-sm-12">
          <p class="text-center">
            <router-link to="/register">Register now.</router-link><br>
            <router-link to="/resend-activation-email">Re-send activation e-mail.</router-link>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      form: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', { form: this.form })
    }
  }
}
</script>

<style lang="scss">
 @import "../../assets/sass/modules/forms.scss";
</style>
