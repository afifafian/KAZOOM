const { gql } = require("apollo-server");
const axios = require("axios");
const Redis = require("ioredis");
const jwt = require("jsonwebtoken");
const redis = new Redis();
const templateUrl = "http://localhost:3001/template";

const typeDefs = gql`
    type Template {
        _id: ID
        title: String
        questions: [Question]
        username: String
    }
    type Messages {
        messages: String
    }
    input TemplateInput {
        title: String!
        questions: String
        token: String!
    }
    extend type Query {
        templates: [Template]
    }
    extend type Mutation {
        addTemplate(newTemplate: TemplateInput): Template
        deleteTemplate(id: ID): Messages
    }
`;

const resolvers = {
    Query: {
        templates: async () => {
            try {
                const templates = JSON.parse(await redis.get("templates"));
                if (templates) {
                    return templates;
                } else {
                    const { data } = await axios({
                        url: templateUrl,
                        method: "GET",
                    });
                    redis.set("templates", JSON.stringify(data));
                    return data;
                }
            } catch (error) {
                return error;
            }
        },
    },
    Mutation: {
        addTemplate: async (parent, args, contex, info) => {
            try {
                const {
                    title,
                    questions: questTempt,
                    token,
                } = args.newTemplate;
                let decode = jwt.verify(token, "jwtSECRET");
                let username = decode.username;
                const questions = JSON.parse(questTempt);
                const newData = { title, questions, username };
                const { data } = await axios({
                    url: templateUrl,
                    method: "POST",
                    data: newData,
                });
                const templates = JSON.parse(await redis.get("templates"));
                if (templates) {
                    templates.push(data);
                    redis.set("templates", JSON.stringify(templates));
                }
                return data;
            } catch (error) {
                return error;
            }
        },
        deleteTemplate: async (parent, args, contex, info) => {
            try {
                const { id } = args;
                const { data } = await axios({
                    url: `${templateUrl}/${id}`,
                    method: "DELETE",
                });
                const templates = JSON.parse(await redis.get("templates"));
                if (templates) {
                    let notDeleted = templates.filter(
                        (template) => template._id !== id
                    );
                    redis.set("templates", JSON.stringify(notDeleted));
                }
                return data;
            } catch (error) {
                return error;
            }
        },
    },
};
// type Choice {
//     answer: String
//     status: Boolean
// }
// type Question {
//     _id: ID
//     question: String
//     choices: [Choice]
//     point: Int
// }
module.exports = {
    typeDefs,
    resolvers,
};
