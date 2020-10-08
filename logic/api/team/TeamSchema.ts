const {gql} = require('apollo-server');

export const TeamSchema = gql`
   type TeamData {
      teamCount: Float
      teamSize: [Count]
      teamsLastWeek: Float
      teamsLastMonth: [NumberDay]
      teamsLastYear: [NumberMonth]
   }

   type TeamMatchData {
      name: String
      regDate: String
      memberCount: Float
      matchesSupposed: Float
      matchesActual: Float
   }

   type Team {
      id: String
      name: String
      regDate: String
      currency: String
      type: String
      org: String
      lastMatch: String
      balance: Float
      matchesTotal: Float
      perMeeting: Float
      events: Float
      meetings: Float
      owner: User
      coach: User
      players: JSON
   }

   type OrgTeamData {
      teamData(org: String!): [Team]
   }

   union TeamSearch = Team | Error

   input TeamSearchInput {
      team: String!
   }

   extend type Query {
      teamData: TeamData
      teamSearch(input: TeamSearchInput!): TeamSearch
      orgTeamData: OrgTeamData
   }
`;
