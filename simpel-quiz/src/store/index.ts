import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// interface
import { SessionTokenRequest } from 'src/interface/SessionTokenRequest';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sessionToken: "",
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    setSessionToken(){ // For at få fat i session token
      axios
          .get<SessionTokenRequest>("https://opentdb.com/api_token.php?command=request")
          .then(Response => {
            this.state.sessionToken = Response.data.token

            console.log(this.state.sessionToken)
          })
    },
    

  },
  modules: {
  }
})
