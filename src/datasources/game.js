const { RESTDataSource } = require('apollo-datasource-rest');
const SquareAPI = require('./square');
const { makeReducer, transformInputs } = require('./utils');

const BASE_URL = 'http://127.0.0.1:5000/api'

const SIZE_MAP = {
  MINI: 5,
  MINI_PLUS: 7,
  STANDARD: 15,
  STANDARD_PLUS: 16,
  SUNDAY: 21
}

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

  async createGame({ size, ...data }) {
    const response = await this.post('/', { data: { size: SIZE_MAP[size], ...data } });
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