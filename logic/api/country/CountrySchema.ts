const {gql} = require('apollo-server');

const CountrySchema = gql`
   type Country {
      groups: Float
      users: Float
   }

   type CountryStats {
      country(country: String!): Country
   }

   type GeneralCountryStats {
      groupsCountry: [PerUnit]
      usersCountry: [PerUnit]
      meetingsCountry: [PerUnit]
   }

   extend type Query {
      generalCountryStats: GeneralCountryStats
      country: CountryStats
   }
`;

module.exports = CountrySchema;
