<template>
  <div class="">
    <center><h1>Login Account</h1></center>
    <v-container grid-list-md text-xs-center>
      <v-form
      ref="form"
      >
      <v-text-field
      v-model="username"
      label="username"
      required
      ></v-text-field>

      <v-text-field
      v-model="password"
      type="password"
      name="input-10-1"
      label="Password"
      ></v-text-field>

      <v-btn
      color="success"
      @click="loginAccount"
      >
      Login
      </v-btn>

      </v-form>
    </v-container>
  </div>
</template>

<script>
  // import HelloWorld from '../components/HelloWorld'

  export default {
    components: {
      // HelloWorld
    },
    data: () => {
      return {
        username: "",
        password: "",
      }
    },
    methods: {
      loginAccount() {
        db.collection("users").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            let obj = doc.data()
            obj.id = doc.id

            if (obj.username == this.username && obj.password == this.password) {
              localStorage.setItem('id', obj.id);
              localStorage.setItem('username', obj.username);
              this.isLogin()
              this.$router.push(`/lobby`)
            }
          });
        });
      },

      isLogin() {
        this.$emit('user-login')
      }
    }
  }
</script>
