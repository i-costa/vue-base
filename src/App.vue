<template>
  <div id="app">
    <header id="nav">
      <div class="container">
        <div class="row">
          <nav>
            <ul>
              <li><router-link to="/">Home</router-link></li>
              <li><router-link to="/about">About</router-link></li>
              <li><router-link to="/logged">Logged Only</router-link></li>
              <li><router-link to="/login" v-if="!isLoggedIn">Login</router-link></li>
              <li><a href="#" @click="logout"  v-if="isLoggedIn">Logout</a></li>
              <li><router-link to="/register" class="register" v-if="!isLoggedIn">Register</router-link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    }
  }
}
</script>

<style lang="scss">
 @import "assets/sass/main.scss";
 @import "assets/sass/bootstrap.scss";
 @import "assets/sass/modules/header.scss";
</style>
