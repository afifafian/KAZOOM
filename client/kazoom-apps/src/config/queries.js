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

export const FETCH_COLLECTIONS = gql`
    query FetchTemplates {
        templates {
            _id
            username
            title
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

export const DELETE_QUESTION = gql`
    mutation DeleteQuestion($questionId: ID) {
        deleteOneQuestion(id: $questionId) {
            message
        }
    }
`

export const DELETE_ALL_QUESTION = gql`
    mutation DeleteAllQuestion {
        deleteMany {
            message
        }
    }
`

export const ADD_USER = gql`
    mutation RegisterUser($inputUser: UserInput) {
        addUser(newUser: $inputUser) {
            _id
            username
        }
    }
`

export const LOGIN_USER = gql`
    mutation LoginUser($inputUser: UserInput) {
        loginUser(user: $inputUser) {
            token
        }
    }
`
export const GET_USERS = gql`
    query {
        users {
            _id
            username
        }
    }
`
 
export const ADD_COLLECTION = gql`
    mutation AddTemplate($inputTemplate: TemplateInput) {
        addTemplate(newTemplate: $inputTemplate) {
            _id
            title
            username
        }
    }
`

export const DELETE_COLLECTION = gql`
    mutation DeleteTemplate($inputId: ID) {
        deleteTemplate(id: $inputId) {
            messages
        }
    }
`