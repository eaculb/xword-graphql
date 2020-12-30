require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers')

const GameAPI = require('./datasources/game');
const SquareAPI = require('./datasources/square');
const ClueAPI = require('./datasources/clue');

const dataSources = () => ({
  gameAPI: new GameAPI(),
  squareAPI: new SquareAPI(),
  clueAPI: new ClueAPI()
})

const server = new ApolloServer({
  typeDefs, resolvers, dataSources
})

server.listen().then(({ url }) => {
  console.log(`
    Server ready at ${url}
    Explore at https://studio.apollographql.com/dev
  `)
});