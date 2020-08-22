import { ApolloClient, InMemoryCache } from '@apollo/client';
import { questionsData, playerPoint, collectionsData, gameId, playerName, quizTitle, addTimer } from './makeVar';

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    questionsCache: {
                        read: () => {
                            return questionsData()
                        }
                    },
                    playerPointCache: {
                        read: () => {
                            return playerPoint()
                        }
                    },
                    collectionsCache: {
                        read: () => {
                            return collectionsData()
                        }
                    },
                    gameIdCache: {
                        read: () => {
                            return gameId()
                        }
                    },
                    playerNameCache: {
                        read: () => {
                            return playerName()
                        }
                    },
                    quizTitleCache: {
                        read: () => {
                            return quizTitle()
                        }
                    },
                    timerCache: {
                        read: () => {
                            return addTimer()
                        }
                    }
                }
            }
        }
    })
})

export default client