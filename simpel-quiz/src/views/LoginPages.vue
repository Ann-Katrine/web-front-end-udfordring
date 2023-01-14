<template>
  <div>
    <h1>Login</h1>
    <div>
      <label>Email: </label><input type="email" v-model="email"/>
    </div>
    <div>
      <label>Password</label><input type="password" v-model="password"/>
    </div>
    <button @click="login()">Login</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'LoginPages',
  data(){
    return{
      email: "",
      password: "",
      dummy: ""
    }
  },
  methods:{
    login(){
      let token = "";

      if(this.email == "hej@" && this.password == '123'){
        
        this.$store.dispatch("setSessionToken")
        .then(value => {
          console.log("Du er logget ind")
        })

        this.$router.push("/quiz")
      }
    }
  }
});
</script>
