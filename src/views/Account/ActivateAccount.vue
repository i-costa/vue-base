<template>
  <section class="activate-account">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 text-center">
          <div v-if="accountActiveStatus === true">
            <h2 class="text-center">Your account is active.</h2>
            <router-link to="/login">Login now</router-link>
          </div>
          <div v-else-if="accountActiveStatus === false">
            <h2 class="text-center">We had a problem while trying to activate your account.</h2>
            <p>Please try again.</p>
            <router-link to="/resend-activation-email">Re-send activation e-mail.</router-link>
          </div>
          <div v-else>
            <h2 class="text-center">Wait...</h2>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import accountService from '@/_services/accountService'
export default {
  name: 'activate-account',
  data () {
    return {
      accountActiveStatus: null
    }
  },
  methods: {
    async activateAccount () {
      var token = this.$route.query.token
      const response = await accountService.activateAccount(token)
      if (response.data.status === 200) {
        this.accountActiveStatus = true
      } else {
        this.accountActiveStatus = false
      }
    }
  },
  mounted () {
    this.activateAccount()
  }
}
</script>
