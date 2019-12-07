const { gql } = require("apollo-server");

const DefaultSchema = gql`
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
    month: JSON
    count: Float!
  }

  type LastMonth {
    resultMonth: [NumberDay]!
  }

  type LastYear {
    resultYear: [NumberMonth]!
  }

  type Query {
    _empty: String
  }
`;

module.exports = DefaultSchema;
