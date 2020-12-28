module.exports = {
  Query: {
    games: async (_, __, { dataSources: { gameAPI } }) => gameAPI.getGames(),
    game: async (_, { gameId }, { dataSources: { gameAPI } }) => gameAPI.getGameById(gameId),
  },

  Mutation: {
    createGame: async (_, { input: data }, { dataSources: { gameAPI } }) => gameAPI.createGame(data),
    updateGame: async (_, { input: { gameId, ...data } }, { dataSources: { gameAPI } }) => gameAPI.updateGame(gameId, data),
    deleteGame: async (_, { input: { gameId } }, { dataSources: { gameAPI } }) => gameAPI.deleteGame(gameId),
  },
}