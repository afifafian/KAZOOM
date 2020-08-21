const { ApolloServer, makeExecutableSchema } = require("apollo-server");
const QuestionSchema = require('./schemas/QuestionSchema');

const typeDefs = `
    type Query
    type Mutation
`;

const schema = makeExecutableSchema({
    typeDefs: [
        typeDefs,
        QuestionSchema.typeDefs, 
    ],
    resolvers: [
        QuestionSchema.resolvers,
    ]
})

const server = new ApolloServer({ schema })

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`); 
});