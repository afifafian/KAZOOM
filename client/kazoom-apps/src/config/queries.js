import { gql } from '@apollo/client';


export const FETCH_QUESTIONS = gql`
    query FetchQuestions {
        questions {
            _id
            question
            choices {
                answer
                status
            }
            point
        }
    }
`

export const ADD_QUESTION = gql`
    mutation AddQuestion($inputQuestion: QuestionInput) {
        addQuestion(newQuestion: $inputQuestion) {
            _id
            question
        }
    }
`

export const FETCH_QUESTIONS_CACHE = gql`
    query FetchQuestionsCache {
        questionsCache {
            _id
            question
            choices {
                answer
                status
            }
            point
        }
    }
`