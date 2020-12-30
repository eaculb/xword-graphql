const { RESTDataSource } = require('apollo-datasource-rest');
const { makeReducer, transformInputs } = require('./utils');

const BASE_URL = 'http://127.0.0.1:5000/api'

class ClueAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = BASE_URL;
  }

  baseReducer = makeReducer()


  async getCluesForGame(gameId) {
    const { data } = await this.get('/games/-/clues/', transformInputs({gameId}));
    return Array.isArray(data) ? data.map(clue => this.baseReducer({ data: clue })) : []
  }

  async getClueById(gameId, squareIndex, direction) {
    const response = await this.get(`/games/${gameId}/clues/${squareIndex};${direction}`)
    return this.baseReducer(response)
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
      clue: this.baseReducer(response)
    }
  }
}

module.exports = ClueAPI;