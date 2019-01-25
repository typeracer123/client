import Vue from 'vue'
import Vuex from 'vuex'
import { getField, updateField } from 'vuex-map-fields';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginForm : {
      email : '',
      password : '',
      message : '',
      active : true 
    },
    registerForm: {
      email : '',
      password : '',
      message: '',
      active: false
    }
  },
  mutations: {
    mutationFormActive(state, payload) {
      state[payload.from].active = false;
      state[payload.to].active = true;
    },
    updateField
  },
  getters: {
    getField

  },
  actions: {
    signOut() {
      firebase.auth().signOut().then(function() {
        localStorage.removeItem('token');
        // self.router.push('login');

      }).catch(function(error) {
        console.log(error);
        // An error happened.
      });
    },
    login(context) {
      console.log()
      let self = this;
      const email = context.state.loginForm.email;
      const password = context.state.loginForm.password;
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function() {
        return firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
      })
      .then(function(idToken) {
        // console.log(idToken);
        localStorage.setItem('token', idToken);
        context.state.loginForm.message = 'successfully signed in new user. Logging in...';
        setTimeout(() => {
        context.state.loginForm.message = '';
        }, 2500);
        // self.router.push('rooms');
      })
      .catch(function(error) {
        console.log(error)
        context.state.loginForm.message = error.message;
        setTimeout(() => {
        context.state.loginForm.message = '';
        }, 4000);
        // ...
      });
    },
    register (context) {
      let self = this;
      const email = context.state.registerForm.email;
      const password = context.state.registerForm.password;

      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function() {
        return firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
      })
      .then(function(idToken) {
        // console.log(idToken);
        localStorage.setItem('token', idToken);
        context.state.registerForm.message = 'successfully registered new user. Logging in...';
        setTimeout(() => {
        context.state.registerForm.message = '';
        }, 3500);
        // self.router.push('rooms');
      })
      .catch(function(error) {
        console.log(error)
        context.state.registerForm.message = error.message;
        setTimeout(() => {
        context.state.registerForm.message = '';
        }, 4000);
        // ...
      });
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user);
        // User is signed in.
      } else {
        console.log('no user is signed in ')
        // No user is signed in.
      }
    });

  }
})
