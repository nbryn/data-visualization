const {gql} = require('apollo-server');

export const CountrySchema = gql`
   type Country {
      teams: Float
      users: Float
   }

   type CountryData {
      country(country: String!): Country
   }

   type GeneralCountryData {
      teamsCountry: [Count]
      usersCountry: [Count]
      matchesCountry: [Count]
   }

   extend type Query {
      generalCountryData: GeneralCountryData
      country: CountryData
   }
`;
