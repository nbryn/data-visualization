const { gql } = require("apollo-server");

const DefSchema = gql`
  type Day {
    year: Float!
    month: Float!
    day: Float!
  }
  type Query {
    _empty: String
  }
`;

module.exports = DefSchema;
