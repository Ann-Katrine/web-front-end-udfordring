export interface quizRequest {
    results: quizQuestions[]    
}

export interface quizQuestions {
    correct_answer: string,
    difficulty: String,
    incorrect_answers: string,
    question: string,
    type: string
}