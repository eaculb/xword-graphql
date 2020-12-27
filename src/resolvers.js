const { paginateResults } = require('./utils')

module.exports = {
  Query: {
    games: async (_, __, { dataSources: { gameAPI } }) => gameAPI.getGames(),
    game: async (_, { gameId }, { dataSources: { gameAPI } }) => gameAPI.getGameById(gameId),
  },

  Mutation: {
    createGame: async (_, data, { dataSources: { gameAPI } }) => gameAPI.createGame(data),
    updateGame: async (_, { gameId, ...data }, { dataSources: { gameAPI } }) => gameAPI.createGame(gameId, data),
  },
}