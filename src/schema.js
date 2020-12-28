const { gql } = require('apollo-server')

const typeDefs = gql`
  type Game {
    id: ID!
    size: Int!
    title: String!
    enforceSymmetry: Boolean!
    squares: [Square]!
    clues: [Clue]!
  }

  type Square {
    id: ID!
    gameId: String!
    game: Game!
    row: Int!
    col: Int!
    char: String!
    clueNumber: Int!
  }

  enum Direction {
    ROW
    COLUMN
  }

  type Clue {
    id: ID!
    gameId: String!
    game: Game!
    startingSquare: Square!
    clueNumber: Int!
    direction: Direction!
    clue: String
  }

  type Query {
    games: [Game]!
    game(gameId: String): Game!
  }

  type Mutation {
    createGame(input: CreateGameInput!): UpdateGameResponse!
    updateGame(input: UpdateGameInput!): UpdateGameResponse!
    deleteGame(input: DeleteGameInput!): DeleteGameResponse!

    updateSquare(input: UpdateSquareInput!): UpdateSquareResponse!

    createClue(input: CreateClueInput!): UpdateClueResponse!
    updateClue(input: UpdateClueInput!): UpdateClueResponse!
    deleteClue(input: UpdateClueInput!): DeleteClueResponse!
  }

  input CreateGameInput {
    size: Int!
    title: String
    enforceSymmetry: Boolean
  }

  input UpdateGameInput {
    gameId: ID!
    title: String
    enforceSymmetry: Boolean
  }

  input DeleteGameInput {
    gameId: ID!
  }

  input UpdateSquareInput {
    squareId: ID!
    char: String
    clueNumber: Int
  }

  input CreateClueInput {
    gameId: ID!
    startingSquareId: ID!
    direction: Direction!
    clue: String!
  }

  input UpdateClueInput {
    clueId: ID!
    clue: String
  }

  type UpdateGameResponse {
    success: Boolean!
    message: String
    game: Game
  }

  type DeleteGameResponse {
    success: Boolean!
    message: String
  }

  type UpdateSquareResponse {
    success: Boolean!
    message: String
    square: Square
  }

  type UpdateClueResponse {
    success: Boolean!
    message: String
    clue: Clue
  }

  type DeleteClueResponse {
    success: Boolean!
    message: String
  }

`;

module.exports = typeDefs;