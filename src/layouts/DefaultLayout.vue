<template>
  <navbar-vue/>
  <v-main>
    <router-view />
  </v-main>
</template>

<script>

import NavbarVue from '../components/Navbar.vue'
import router from "../router/index.js";

export default {
  components: { NavbarVue },
  mounted() {

    const jwt_token = localStorage.getItem('user_jwt')
        if (jwt_token) {
          this.createUserLocalStorage(jwt_token)
        } else if (this.$store.state.User.user === null) {
          router.push({name: 'Auth'})
        }

  },

  methods: {
    async createUserLocalStorage(jwt_token) {
      const user_data = await this.$store.dispatch('User/decodeJwtLogin', localStorage.getItem('user_jwt'))
      this.$store.commit('User/setUser', user_data)
    }
  }
}
</script>

<style>
</style>