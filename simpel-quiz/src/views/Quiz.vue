<template>
    <div>
        <h1>Animals Quiz</h1>
        <nav>
            <ul>
                <li>
                    <button>Easy</button>
                </li>
                <li>
                    <button>Medium</button>
                </li>
                <li>
                    <button>Hard</button>
                </li>
                <li>
                    <button>Log ud</button>
                </li>
            </ul>
        </nav>
        <div>
            <h2> Spørgsmål </h2>
            <div>
                <div>
                    <input type="checkbox"/><label> Choice 1 </label>
                </div>
                <div>
                    <input type="checkbox"/><label> Choice 2 </label>
                </div>
                <div>
                    <input type="checkbox"/><label> Choice 3</label>
                </div>
                <div>
                    <input type="checkbox"/><label> Choice 4</label>
                </div>
            </div>
            <div > <!-- true / false-->
                <div>
                    <input type="radio"/><label> choice 1</label>
                </div>
                <div>
                    <input type="radio"/><label> Choice 2</label>
                </div>
            </div>
            <button @click="nextQuestion()">Næste Spørgsmål</button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { quizQuestions, quizRequest } from 'src/interface/QuizRequest'

export default Vue.extend({
    name: 'Quiz',
    data(){
        return{
            api: "https://opentdb.com/api.php",
            difficulty: "easy",
            quiz: [] as quizQuestions[]
        }
    },
    created(){
        this.getQuiz()
    },
    methods:{
        getQuiz(){
            axios
                .get<quizRequest>(this.api + "?amount=10&category=27&difficulty=" + this.difficulty + "&token=5eacead0d4762c454218fdbd72035ae618d99b5fec4e8eff94d290c96ebcf47d")
                .then(Response => {
                    this.quiz = Response.data.results
                    console.log(this.quiz)
                    console.log(this.quiz[1].correct_answer)
                })
        },
        nextQuestion(){
            console.log("hej");
        }
    }   
})
</script>