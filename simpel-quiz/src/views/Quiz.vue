<template>
    <div>
        <div class="headerBox">
            <h1 class="header">Animals Quiz</h1>
            <nav>
                <ul class="nav">
                    <li>
                        <button class="navbutton" @click="setDifficulty('easy')">Easy</button>
                    </li>
                    <li>
                        <button class="navbutton" @click="setDifficulty('medium')">Medium</button>
                    </li>
                    <li>
                        <button class="navbutton" @click="setDifficulty('hard')">Hard</button>
                    </li>
                    <li>
                        <button class="navbutton" @click="logout()">Log ud</button>
                    </li>
                </ul>
            </nav>
        </div>
        <div v-if="quizAnswer.length < 10" class="bodyOuterbox">
            <h2 v-html="getApiQuiz[number].question"></h2>
            <p>Kun vælge et svar</p>
            <div class="answerOuterBox">
                <div>
                    <input v-model="ischeked" :value="getApiQuiz[number].correct_answer" type="checkbox"/><label v-html="getApiQuiz[number].correct_answer"></label>
                </div>
                <div v-for="(quiz, index) in getApiQuiz[number].incorrect_answers" :key="index">
                    <input v-model="ischeked" :value="quiz"  type="checkbox"/><label v-html="quiz"></label>
                </div>
            </div>
            <button v-if="quizAnswer.length < 8" @click="nextQuestion()">Næste Spørgsmål</button>
            <button v-else @click="nextQuestion()">Hvis svarende</button>
        </div>
        <div v-else class="bodyOuterbox">
            <div  v-for="(quizAnwsers, id) in getApiQuiz" :key="id">
                <h2 v-html="getApiQuiz[id].question"></h2>
                <div>
                    <div>
                        <input :value="getApiQuiz[id].correct_answer" :checked="getApiQuiz[id].correct_answer == quizAnswer[id]" type="checkbox"/>
                        <label v-if="getApiQuiz[id].correct_answer == quizAnswer[id]" v-html="getApiQuiz[id].correct_answer + '   :your answer'" class="green"></label>
                        <label v-else v-html="getApiQuiz[id].correct_answer + '  :The correct answer'"></label>
                    </div>
                    <div v-for="(quiz, index) in getApiQuiz[id].incorrect_answers" :key="index">
                        <input :value="quiz" :checked="quiz == quizAnswer[id]"  type="checkbox"/>
                        <label v-if="quiz == quizAnswer[id]" v-html="quiz + '   :your answer'" class="red"></label>
                        <label v-else v-html="quiz"></label>
                    </div>
                </div>
            </div>
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
            number: 0,
            ischeked: [],
            quizAnswer: []
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
            let AnswerCount = 0;

            if(this.number < 10){
                this.quizAnswer.push(this.ischeked[0])
                this.ischeked = []
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

<style>
    .headerBox{
        position: fixed;
        top: 0;
        width: 100%;
	    z-index: 1;
        background-color: #fff;
    }

    .bodyOuterbox{
        margin-top: 10em;
    }

    .header{
        font-size: 2em;
        margin: 0.5em 0;
    }

    nav{
        
        padding: 0 0 0.5em 0;
    }

    ul{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }

    li{
        padding: 0 1em;
    }

    .navbutton{
        margin: 1em 0em 1em 1em;
        padding: 0.5em 2em 0.5em 2em;
    }

    h2{
        font-size: 1.5em;
        margin: 1em 0 0.5em 0;
    }

    .answerOuterBox{
        display: flex;
        flex-direction: column;
        align-items:center;
        
        margin: 0.5em 0 0.5em 0;
    }

    .green{
        color: #33cc33;
    }

    .red{
        color: #ff0000;
    }
</style>