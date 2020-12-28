const { RESTDataSource } = require('apollo-datasource-rest');
const { makeReducer, transformInputs } = require('./utils');

class GameAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://127.0.0.1:5000/api';
  }

  baseReducer = makeReducer()

  async getGames() {
    const { data } = await this.get('/games/');
    console.log(data[0])
    return Array.isArray(data) ? data.map(game => this.baseReducer({ data: game })) : []
  }

  async getGameById(gameId) {
    const response = await this.get(`/games/${gameId}`);
    return this.baseReducer(response)
  }

  async createGame(data) {
    const response = await this.post('/games/', { data });
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
    const response = await this.patch(`/games/${gameId}`, { data: transformInputs(data) });
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

  async deleteGame(gameId) {
    // FIXME: can we actually access the status code here?
    await this.delete(`/games/${gameId}`);

    return {
      success: true
    }
  }
}

module.exports = GameAPI;