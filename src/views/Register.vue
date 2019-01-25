<template>
  <div class="">
    <center><h1>Register Account</h1></center>
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
      @click="registerAccount"
      >
      Register Account
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
      registerAccount() {
        db.collection("users").add({
            username: this.username,
            password: this.password,
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            this.$router.push(`/login`)
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
      }
    }
  }
</script>
