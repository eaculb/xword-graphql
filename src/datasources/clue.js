const { RESTDataSource } = require('apollo-datasource-rest');
const { makeReducer, transformInputs } = require('./utils');

const BASE_URL = 'http://127.0.0.1:5000/api'

class ClueAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = BASE_URL;
  }

  clueReducer = makeReducer({ id: ({ squareIndex, direction, gameId }) => `${gameId}:${squareIndex}:${direction}` })

  async getCluesForGame(gameId) {
    const { data } = await this.get('/games/-/clues/', transformInputs({ gameId }));
    return Array.isArray(data) ? data.map(clue => this.clueReducer({ data: clue })) : []
  }

  async getClueById(gameId, squareIndex, direction) {
    const response = await this.get(`/games/${gameId}/clues/${squareIndex};${direction}`)
    return this.clueReducer(response)
  }

  async upsertClue(gameId, squareIndex, direction, data) {
    const response = await this.put(`/games/${gameId}/clues/${squareIndex};${direction}`, {
      data: transformInputs({
        gameId, squareIndex, direction, ...data
      })
    });
    if (!response) {
      return {
        success: false,
        message: 'Failed to upsert clue'
      }
    }

    return {
      success: true,
      clue: this.clueReducer(response)
    }
  }
}

module.exports = ClueAPI;