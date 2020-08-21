export const addQuestion = (question) => {
    return {
        type: "ADD_QUESTION",
        payload: question
    }
}

export const setQuestions = (questions) => {
    return {
        type: "SET_QUESTIONS",
        payload: questions
    }
}

export const setPlayerName = (name) => {
    return {
        type: "SET_PLAYER_NAME",
        payload: name
    }
}

export const deleteQuestion = (id) => {
    return {
        type: "DELETE_QUESTION",
        payload: id
    }
}

export const addCollection = (collection) => {
    return {
        type: "ADD_COLLECTION",
        payload: collection
    }
}

export const deleteCollection = (id) => {
    return {
        type: "DELETE_COLLECTION",
        payload: id
    }
}

export const setGameId = (id) => {
    return {
        type: "SET_GAMEID",
        payload: id
    }
}

export const addPoint = (point) => {
    return {
        type: "ADD_POINT",
        payload: point
    }
}