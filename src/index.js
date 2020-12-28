require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers')

const GameAPI = require('./datasources/game');

const dataSources = () => ({
  gameAPI: new GameAPI(),
})

const server = new ApolloServer({
  typeDefs, resolvers, dataSources
})

server.listen().then(({ url }) => {
  console.log(`
    Server ready at ${url}!
    Explore at https://studio.apollographql.com/dev
  `)
});