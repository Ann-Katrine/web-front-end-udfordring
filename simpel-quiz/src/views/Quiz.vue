<template>
    <div>
        <h1>Animals Quiz</h1>
        <nav>
            <ul>
                <li>
                    <button @click="setDifficulty('easy')">Easy</button>
                </li>
                <li>
                    <button @click="setDifficulty('medium')">Medium</button>
                </li>
                <li>
                    <button @click="setDifficulty('hard')">Hard</button>
                </li>
                <li>
                    <button @click="logout()">Log ud</button>
                </li>
            </ul>
        </nav>
        <div>
            <h2 v-html="getApiQuiz[number].question"></h2>
            <div>
                <div>
                    <input type="checkbox"/><label v-html="getApiQuiz[number].correct_answer"></label>
                </div>
                <div v-for="(quiz, index) in getApiQuiz[number].incorrect_answers" :key="index">
                    <input type="checkbox"/><label v-html="quiz"></label>
                </div>
            </div>
            <button @click="nextQuestion()">Næste Spørgsmål</button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
    name: 'Quiz',
    data(){
        return{
            number: 0
        }
    },
    created(){
        this.getQuiz()
    },
    computed:{
        ...mapGetters(['getApiQuiz'])
    },
    methods:{
        getQuiz(){
            this.$store.dispatch("setQuiz")
        },
        nextQuestion(){
            if(this.number != 9){
                this.number++;
            }
        },
        logout(){
            this.$store.dispatch("restSessionToken")
            .then(value => {
                this.$router.push("/")
            })
        },
        setDifficulty(value: string){
            this.$store.dispatch("setTheQuizDifficulty", {difficulty: value})
        }
    }   
})
</script>