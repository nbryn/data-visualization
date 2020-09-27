const {gql} = require('apollo-server');

export const MatchSchema = gql`
   type MatchData {
      matchTotal: Float
      matchesLastMonth: [NumberDay]
      matchesLastYear: [NumberMonth]
      matchesPerTeam: [Count]
      meetingsPerEvent: [Count]
   }

   extend type Query {
      matchData: MatchData
   }
`;
