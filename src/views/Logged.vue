<template>
  <section class="logged">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h2 class="text-center">This is a logged page</h2>
          <p class="text-center">
            This should be the logged page info.
          </p>
          <p class="text-center" v-if="userInfo">
            {{ userInfo.firstName }}<br>
            {{ userInfo.birthDate }}<br>
            {{ userInfo.cep }}<br>
            {{ userInfo.email }}<br>
            {{ userInfo.createdDate }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'logged',
  data () {
    return {
      form: {
        email: null,
        password: null
      },
      userInfo: null
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    }
  },
  mounted () {
    console.log(this.$store.state.userInfo)
    this.userInfo = this.$store.state.userInfo
  }
}
</script>
