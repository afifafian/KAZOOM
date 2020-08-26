const { gql } = require("apollo-server");
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();
const leaderboardsUrl = "http://localhost:3002/users/leaderboards";
const registerUrl = "http://localhost:3002/users/register";
const loginUrl = "http://localhost:3002/users/login";

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        password: String
    }
    type Token {
        token: String
    }
    input UserInput {
        username: String!
        password: String!
    }
    extend type Query {
        users: [User]
    }
    extend type Mutation {
        loginUser(user: UserInput): Token
        addUser(newUser: UserInput): User
    }
`;

const resolvers = {
    Query: {
        users: async () => {
            try {
                const users = JSON.parse(await redis.get("users"));
                if (users) {
                    return users;
                } else {
                    const {data} = await axios({
                        url: leaderboardsUrl,
                        method: "GET",
                    });
                    redis.set("users", JSON.stringify(data));
                    return data;
                }
            } catch (error) {
                console.log(error);
                return error;
            }
        },
    },
    Mutation: {
        loginUser: async (parent, args, context, info) => {
            try {
                const { username, password } = args.user;
                const loginData = { username, password };
                const { data } = await axios({
                    url: loginUrl,
                    method: "POST",
                    data: loginData,
                });
                if (data) {
                    console.log(data, `ini tokennya`)
                    return data;
                }
            } catch (error) {
                return error;
            }
        },
        addUser: async (parent, args, contex, info) => {
            try {
                const { username, password } = args.newUser;
                const newData = { username, password };
                console.log(newData, `masuk`)
                const { data } = await axios({
                    url: registerUrl,
                    method: "POST",
                    data: newData,
                });
                const users = JSON.parse(await redis.get("users"));
                if (users) {
                    users.push(data);
                    redis.set("users", JSON.stringify(users));
                }
                console.log(data)
                return data;
            } catch (error) {
                console.log(error)
                return(error)
            }
        },
    }
};

module.exports = {
    typeDefs,
    resolvers,
};