import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// interface
import { SessionTokenRequest } from 'src/interface/SessionTokenRequest';
import { quizQuestions, quizRequest } from 'src/interface/QuizRequest'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sessionToken: "",
    api: "https://opentdb.com/api.php",
    questionsDifficulty: "easy",
    tempQuiz: [] as quizQuestions[],
  },
  getters: {
    getApiQuiz: state => {
      return state.tempQuiz
    }
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
    restSessionToken(){ // For når man logge ud
      this.state.sessionToken = ""
    },
    setQuiz(){ // For at få data fra A
      axios
        .get<quizRequest>(this.state.api + "?amount=10&category=27&difficulty=" + this.state.questionsDifficulty + "&token=" + this.state.sessionToken)
        .then(Response => {
            this.state.tempQuiz = Response.data.results
            console.log(this.state.tempQuiz)
        })
    },
    setTheQuizDifficulty(state, difficulty){
      axios
        .get<quizRequest>(this.state.api + "?amount=10&category=27&difficulty=" + difficulty.difficulty + "&token=" + this.state.sessionToken)
        .then(Response => {
            this.state.tempQuiz = Response.data.results
            console.log(this.state.tempQuiz)
        })
    }
  },
  modules: {
  }
})
