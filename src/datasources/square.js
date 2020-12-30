const { RESTDataSource } = require('apollo-datasource-rest');
const { makeReducer, transformInputs } = require('./utils');

const BASE_URL = 'http://127.0.0.1:5000/api'

class SquareAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = BASE_URL;
  }

  baseReducer = makeReducer()

  async getSquareById(gameId, index) {
    const { data } = await this.get(`/games/${gameId}/squares/${index}`);
    return Array.isArray(data) ? data.map(square => this.baseReducer({ data: square })) : []
  }

  async updateSquare(gameId, index, data) {
    const response = await this.patch(`/games/${gameId}/squares/${index}`, { data: transformInputs({ gameId, index, ...data }) });
    if (!response) {
      return {
        success: false,
        message: 'Failed to update square'
      }
    }
    
    return {
      success: true,
      square: this.baseReducer(response)
    }
  }
}

module.exports = SquareAPI;