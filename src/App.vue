<template>
  <v-app>
    <v-toolbar dark color='black'>
    <h1>TypeRacer123</h1>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn v-if="isLogin == false" flat @click="toLogin">Log-in</v-btn>
      <v-btn v-if="isLogin" flat @click="logOut">Log-out</v-btn>
      <v-btn v-if="isLogin == false" flat @click="toRegister">Register</v-btn>
    </v-toolbar-items>
  </v-toolbar>
    <v-content>
      <router-view @user-login="userLogin"></router-view>
    </v-content>
    <v-footer
      dark
      height="auto"
    >
      <v-card
        flat
        tile
        class="lighten-1 white--text text-xs-center"
        color='black'
      >
        <v-card-text>
          <h1>TypeRacer123</h1>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          Berlombalah degnan teman anda, siapa yang lebih cepat mengetik, kalahkan semua teman anda, dan teruslah berlatih.
          Jangan sombong jika anda menang, ini semua hanyalah permainan. Mari kita latih jari tangan kita agar bisa menjadi lebih kuat lagi
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          &copy;2018 — <strong>TypeRacer123</strong>
        </v-card-text>
      </v-card>
    </v-footer>
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
  mounted() {
    if (localStorage.getItem('username')) {
      this.isLogin = true
    }
  }
}
</script>
