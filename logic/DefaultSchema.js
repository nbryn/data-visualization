const { gql } = require("apollo-server");

const DefaultSchema = gql`
  scalar JSON

  type Day {
    year: Float!
    month: Float!
    day: Float!
  }

  type NumberDay {
    day: Day!
    count: Float!
  }

  type NumberMonth {
    year: Float
    month: Float
    count: Float
  }

  type LastMonth {
    data: [NumberDay]!
  }

  type LastYear {
    data: [NumberMonth]!
  }

  type Query {
    _empty: String
  }
`;

module.exports = DefaultSchema;
