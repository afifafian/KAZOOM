import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

const initState = {
    questions: [],
    playerPoint: 0,
    collections: [],
    gameId: '',
    playerName: '',
}

const kahootReducer = (state = initState, action) => {
    switch(action.type) {
        case "ADD_POINT":
            return {
                ...state, playerPoint: state.playerPoint+action.payload
            }
        case "SET_PLAYER_NAME":
            return {
                ...state, playerName: action.payload
            }
        case "SET_QUESTIONS":
            return {
                ...state, questions: action.payload
            }
        case "ADD_QUESTION":
            return {
                ...state, questions: state.questions.concat(action.payload)
            };
        case "DELETE_QUESTION":
            return {
                ...state, questions: state.questions.filter(question => question.id !== action.payload)
            };
        case "ADD_COLLECTION":
            return {
                ...state, collections: state.collections.concat(action.payload)
            }
        case "DELETE_COLLECTION":
            return {
                ...state, collections: state.collections.filter(collection => collection.id !== action.payload)
            };
        case "SET_GAMEID":
            return {
                ...state, gameId: action.payload
            }
        default:
            return state
    }
}

const store = createStore(kahootReducer, applyMiddleware(thunk))

export default store