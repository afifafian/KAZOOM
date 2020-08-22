const { gql } = require("apollo-server");
const axios = require("axios");
const Redis = require("ioredis");
const redis = new Redis();
const leaderboardsUrl = "http://localhost:3002/users/leaderboards";
const registerUrl = "http://localhost:3002/users/register";

const typeDefs = gql`
    type User {
        _id: ID
        username: String
    }
    input UserInput {
        username: String!
    }
    extend type Query {
        users: [User]
    }
    extend type Mutation {
        addUser(newUser: UserInput!): User
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
        addUser: async (parent, args, contex, info) => {
            try {
                const { username } = args.newUser;
                const newData = { username };
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