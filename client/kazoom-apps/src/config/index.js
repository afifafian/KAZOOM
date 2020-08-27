import { ApolloClient, InMemoryCache } from '@apollo/client';
import { questionsData, playerPoints, gameSettingLocal, collectionsData, gameId, playersJoin, quizTitle, addTimer } from './makeVar';

const client = new ApolloClient({
    uri: 'https://kazoom2.ajatdarojat45.space/',
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    gameSettingLocal: {
                        read: () => {
                            return gameSettingLocal()
                        }
                    },
                    questionsCache: {
                        read: () => {
                            return questionsData()
                        }
                    },
                    playerPointCache: {
                        read: () => {
                            return playerPoints()
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
                    playersJoinCache: {
                        read: () => {
                            return playersJoin()
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