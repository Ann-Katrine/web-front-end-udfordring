<template>
  <div class="outerbox">
    <div class="innerBox">
      <h1 class="header">Login</h1>
      <div class="inputAndButtonOuterBox">
        <div class="inputSpace">
          <label class="email">Email: </label><input type="email" v-model="email" class="input"/>
        </div>
        <div>
          <label>Password: </label><input type="password" v-model="password" class="input"/>
        </div>
        <button class="button" @click="login()">Login</button>

      </div>
    </div>
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
      this.$store.dispatch("setSessionToken")
      .then(value => {
        this.$router.push("/quiz")
      })
    }
  }
});
</script>

<style>
  .outerbox{
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .innerBox{
    background-color: #B8E6E6;
    padding: 1em 3em 1em 3em;
    border-radius: 1.5em;
    margin-bottom: 8em;
  }

  .header{
    font-size: 2em;
    margin-bottom: 0.5em;
  }

  .inputAndButtonOuterBox{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .inputOuterBox{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
  }

  .inputSpace{
    margin-bottom: 0.5em;
  }

  .email{
    padding-right: 1.9em;
  }

  .input{
    width: 19em;
  }

  .button{
    margin: 1em 0em 1em 1em;
    padding: 0.5em 2em 0.5em 2em;
  }
</style>
