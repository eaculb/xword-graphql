const { RESTDataSource } = require('apollo-datasource-rest');
const { makeReducer } = require('./utils');

class GameAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://localhost:8000/';
  }

  baseReducer = makeReducer()

  async getGames() {
    const response = await this.get('games');
    return Array.isArray(response) ? response.map(game => this.baseReducer(game)) : []
  }

  async getGameById(gameId) {
    const response = await this.get(`games/${gameId}/`);
    return this.baseReducer(response)
  }

  async createGame(data) {
    const response = await this.post('games', data);
    if (!response) {
      return {
        success: false,
        message: 'Failed to create game'
      }
    }

    return {
      success: true,
      game: this.baseReducer(response)
    }
  }

  async updateGame(gameId, data) {
    const response = await this.patch(`games/${gameId}/`, data);
    if (!response) {
      return {
        success: false,
        message: 'Failed to update game'
      }
    }

    return {
      success: true,
      game: this.baseReducer(response)
    }
  }
}

module.exports = GameAPI;