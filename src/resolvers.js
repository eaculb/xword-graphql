module.exports = {
  Query: {
    games: async (_, __, { dataSources: { gameAPI } }) => gameAPI.getGames(),
    game: async (_, { gameId }, { dataSources: { gameAPI } }) => gameAPI.getGameById(gameId),
  },

  Mutation: {
    createGame: async (_, { input: data }, { dataSources: { gameAPI } }) => gameAPI.createGame(data),
    updateGame: async (_, { input: { gameId, ...data } }, { dataSources: { gameAPI } }) => gameAPI.updateGame(gameId, data),
    deleteGame: async (_, { input: { gameId } }, { dataSources: { gameAPI } }) => gameAPI.deleteGame(gameId),

    updateSquare: async (_, { input: { gameId, index, ...data } }, { dataSources: { squareAPI } }) => squareAPI.updateSquare(gameId, index, data),

    upsertClue: async (_, { input: { gameId, squareIndex, direction, ...data } }, { dataSources: { clueAPI } }) => clueAPI.upsertClue(gameId, squareIndex, direction, data)
  },

  Game: {
    clues: async ({ id: gameId }, _, { dataSources: { clueAPI } }) => clueAPI.getCluesForGame(gameId),
    squares: async ({ id: gameId }, _, { dataSources: { squareAPI } }) => squareAPI.getSquaresForGame(gameId),
  }
}