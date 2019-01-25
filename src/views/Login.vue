<template>
  <div class="container">
    <div v-show="la" class="card">
      <div class="card-header">
        <h1>Login to Typeracer</h1>
      </div>
      <div class="card-body">
        <form id="login" @submit.prevent = "login">
          <input v-model="le" type="text" placeholder="email"/>
          <br>
          <input v-model="lp" type="password" placeholder="enter password"/>
          <br>
          <input class="btn btn-primary" type="submit">
        </form>
        <hr>
        <span>{{lm}}</span>
        <hr>
      </div>
      <div class="card-footer">
        <div class="btn btn-link" @click="changeForm({from: 'loginForm',to: 'registerForm'})">register here</div>
      </div>
    </div>
    <div v-show="ra"  class="card">
      <div class="card-header">
        <h1>Register</h1>
      </div>
      <div class="card-body">
        <form id="register" @submit.prevent ="register">
          <input v-model="re" type="text" placeholder="email"/>
          <br>
          <input v-model="rp" type="password" placeholder="password"/>
          <br>
          <input class="btn btn-primary" type="submit">
        </form>
        <hr>
        <span>{{rm}}</span>
        <hr>
      </div>
      <div class="card-footer">
        <div class="btn btn-link" @click="changeForm({from: 'registerForm',to: 'loginForm'})">login</div>
      </div>
    </div>
  </div>

</template>
<style>
  .card-body span {
    color: red;
  }
  .card-body input {
    margin: 15px 0;
    padding: 5px 5px;
  }
  input {
    height: 50px;
    width: 190px;
    border: grey solid 1px;
  }
</style>

<script>
import {mapState} from 'vuex';
import {mapActions} from 'vuex';
import { mapFields } from 'vuex-map-fields';

  export default {
    computed : {
      ...mapFields ({
        la: 'loginForm.active',
        le:'loginForm.email',
        lp:'loginForm.password',
        lm: 'loginForm.message',
        ra: 'registerForm.active',
        re: 'registerForm.email', 
        rp:'registerForm.password',
        rm: 'registerForm.message'
      })
    },
    methods: {
      changeForm: function({from,to}) {
        this.$store.commit('mutationFormActive', {
          from,
          to
        })
      },
      ...mapActions(['register', 'login'])
    }
  }
</script>
