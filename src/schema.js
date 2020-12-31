const { gql } = require('apollo-server')

const typeDefs = gql`
  enum PresetSize {
    MINI
    MINI_PLUS
    STANDARD
    STANDARD_PLUS
    SUNDAY
  }

  type Game {
    id: ID!
    size: Int!
    title: String
    enforceSymmetry: Boolean!
    squares: [Square!]!
    clues: [Clue]!
  }

  type Square {
    id: ID!
    gameId: String!
    game: Game!
    index: Int!
    char: String
    writeable: Boolean!
  }

  enum Direction {
    ROW
    COLUMN
  }

  type Clue {
    id: ID!
    gameId: String!
    squareIndex: Int!
    square: Square!
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

    upsertClue(input: UpsertClueInput!): UpsertClueResponse!
    deleteClue(input: DeleteClueInput!): DeleteClueResponse!
  }

  input CreateGameInput {
    size: PresetSize!
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
    gameId: ID!
    index: Int!
    char: String
  }

  input UpsertClueInput {
    gameId: ID!
    squareIndex: Int!
    direction: Direction!
    clue: String!
  }

  input DeleteClueInput {
    gameId: ID!
    squareIndex: Int!
    direction: Direction!
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

  type UpsertClueResponse {
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