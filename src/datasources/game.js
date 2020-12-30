const { RESTDataSource } = require('apollo-datasource-rest');
const { makeReducer, transformInputs } = require('./utils');

const BASE_URL = 'http://127.0.0.1:5000/api'

class GameAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${BASE_URL}/games`;
  }

  gameReducer = makeReducer()

  async getGames() {
    const { data } = await this.get('/');
    return Array.isArray(data) ? data.map(game => this.gameReducer({ data: game })) : []
  }

  async getGameById(gameId) {
    const response = await this.get(`/${gameId}`);
    return this.gameReducer(response)
  }

  async createGame(data) {
    const response = await this.post('/', { data });
    if (!response) {
      return {
        success: false,
        message: 'Failed to create game'
      }
    }

    return {
      success: true,
      game: this.gameReducer(response)
    }
  }

  async updateGame(gameId, data) {
    const response = await this.patch(`/${gameId}`, { data: transformInputs(data) });
    if (!response) {
      return {
        success: false,
        message: 'Failed to update game'
      }
    }

    return {
      success: true,
      game: this.gameReducer(response)
    }
  }

  async deleteGame(gameId) {
    // FIXME: can we actually access the status code here?
    await this.delete(`/${gameId}`);

    return {
      success: true
    }
  }
}

module.exports = GameAPI;