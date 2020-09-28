const {gql} = require('apollo-server');

export const MatchSchema = gql`
   type MatchData {
      matchTotal: Float
      matchesLastMonth: [NumberDay]
      matchesLastYear: [NumberMonth]
      matchesPerTeam: [Count]
      meetingsPerMatch: [Count]
   }

   extend type Query {
      matchData: MatchData
   }
`;
