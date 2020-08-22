const { ApolloServer, makeExecutableSchema } = require("apollo-server");
const TemplateSchema = require('./schemas/TemplateSchema');
const QuestionSchema = require('./schemas/QuestionSchema');
const UserSchema = require('./schemas/UserSchema');

const typeDefs = `
    type Query
    type Mutation
`;

const schema = makeExecutableSchema({
    typeDefs: [
        typeDefs,
        TemplateSchema.typeDefs,
        QuestionSchema.typeDefs,
        UserSchema.typeDefs,
    ],
    resolvers: [
        TemplateSchema.resolvers,
        QuestionSchema.resolvers,
        UserSchema.resolvers,
    ]
})

const server = new ApolloServer({ schema })

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`); 
});