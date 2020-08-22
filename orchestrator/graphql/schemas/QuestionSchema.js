const { gql } = require("apollo-server");
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();
const questionUrl = "http://localhost:3001/questions";

const typeDefs = gql`
    type Choice {
        answer: String
        status: Boolean
    }
    type Question {
        _id: ID
        question: String
        choices: [Choice]
        point: Int
    }
    type Message {
        message: String
    }
    input QuestionInput {
        question: String!
        choices: String
        point: Int
    }
    extend type Query {
        questions: [Question]
        
    }
    extend type Mutation {
        addQuestion(newQuestion: QuestionInput): Question
        deleteOneQuestion(id: ID): Message
        deleteMany: Message
    }
`;

const resolvers = {
    Query: {
        questions: async () => {
            try {
                const questions = JSON.parse(await redis.get("questions"));
                if (questions) {
                    return questions;
                } else {
                    const {data} = await axios({
                        url: questionUrl,
                        method: "GET",
                    });
                    redis.set("questions", JSON.stringify(data));
                    return data;
                }
            } catch (error) {
                console.log(error);
                return error;
            }
        },
    },
    Mutation: {
        addQuestion: async (parent, args, contex, info) => {
            try {
                console.log("masuk?")
                const { question, choices: choice2, point } = args.newQuestion;
                const choices = JSON.parse(choice2)
                console.log(choices, "ini choices parsed")
                const newData = { question, choices, point };
                const { data } = await axios({
                    url: questionUrl,
                    method: "POST",
                    data: newData,
                });
                const questions = JSON.parse(await redis.get("questions"));
                if (questions) {
                    questions.push(data);
                    redis.set("questions", JSON.stringify(questions));
                }
                return data;
            } catch (error) {
                console.log(error)
                return(error)
            }
        },
        deleteOneQuestion: async (parent, args, contex, info) => {
            try {
                const { id } = args;
                const { data } = await axios({
                    url: `${questionUrl}/${id}`,
                    method: "DELETE",
                });
                const questions = JSON.parse(await redis.get("questions"));
                if (questions) {
                    let notDeleted = questions.filter((question) => question._id !== id)
                    redis.set("questions", JSON.stringify(notDeleted));
                }
                return data;
            } catch (error) {
                return error;
            }
        },
        deleteMany: async (parent, args, contex, info) => {
            try {
                const { data } = await axios({
                    url: questionUrl,
                    method: "DELETE",
                });
                const questions = JSON.parse(await redis.get("questions"));
                if (questions) {
                    redis.del("questions")
                }
                return data;
            } catch (error) {
                return error;
            }
        }
    }
};

module.exports = {
    typeDefs,
    resolvers,
};