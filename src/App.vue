<template>
  <v-app>
    <v-toolbar>
    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn v-if="isLogin == false" flat @click="toLogin">Log-in</v-btn>
      <v-btn v-if="isLogin" flat @click="logOut">Log-out</v-btn>
      <v-btn v-if="isLogin == false" flat @click="toRegister">Register</v-btn>
    </v-toolbar-items>
  </v-toolbar>
    <v-content>
      <br><br>
      <router-view @user-login="userLogin"></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
    //
  },
  data () {
    return {
      isLogin: false
    }
  },
  methods: {
    userLogin() {
      this.isLogin = true
    },
    toLogin() {
      this.$router.push(`/login`)
    },
    toRegister() {
      this.$router.push(`/register`)
    },
    logOut() {
      localStorage.clear()
      this.isLogin = false
      this.$router.push(`/`)
    }
  },
}
</script>
