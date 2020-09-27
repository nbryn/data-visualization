const {gql} = require('apollo-server');

export const OrgSchema = gql`
   type TeamsPerUser {
      id: String
      name: String
      count: Float
   }

   type OrgData {
      teamsPerOrg: [Count]
      teamsPerUser: [TeamsPerUser]
      usersPerOrg: [Count]
   }

   extend type Query {
      orgData: OrgData
   }
`;
