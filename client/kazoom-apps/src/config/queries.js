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

export const ADD_TEMPLATE = gql`
    mutation AddTemplate($inputTemplate: TemplateInput) {
        addTemplate(newTemplate: $inputTemplate) {
            _id
            title
            userId
        }
    }
`

export const DELETE_TEMPLATE = gql`
    mutation DeleteTemplate($templateId: ID) {
        deleteTemplate(id: $templateId) {
            message
        }
    }
`