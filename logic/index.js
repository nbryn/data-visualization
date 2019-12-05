const { gql } = require("apollo-server");

const DefaultSchema = gql`
  type Day {
    year: Float!
    month: Float!
    day: Float!
  }
  type Query {
    _empty: String
  }
`;

module.exports = DefaultSchema;
