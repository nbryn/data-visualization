const { gql } = require("apollo-server");

const CountrySchema = gql`
  type Country {
    groups: Float
    users: Float
  }

  type CountryStats {
    country(country: String!): Country
  }

  type PerCountry {
    name: String
    count: Float
  }

  type GeneralCountryStats {
    groupsCountry: [PerCountry]
    usersCountry: [PerCountry]
    meetingsCountry: [PerCountry]
  }

  extend type Query {
    generalCountryStats: GeneralCountryStats
    country: CountryStats
  }
`;

module.exports = CountrySchema;
