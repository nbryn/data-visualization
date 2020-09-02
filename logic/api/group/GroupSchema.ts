const {gql} = require('apollo-server');

export const GroupSchema = gql`
   type GroupStats {
      groupTotal: Float
      groupSize: [PerUnit]
      groupsLastWeek: Float
      groupsLastMonth: [NumberDay]
      groupsLastYear: [NumberMonth]
   }

   type GroupMeetingStats {
      name: String
      regDate: String
      memberCount: Float
      meetingSupposed: Float
      meetingActual: Float
   }

   type GroupEngagement {
      groupsActive: Float
      groupMeetingFrequency: [PerValue]
      groupMeetingStats: [GroupMeetingStats]
   }

   type Group {
      id: String
      name: String
      regDate: String
      currency: String
      cycle: Float
      type: String
      ngo: String
      lastMeeting: String
      boxBalance: Float
      meetingsTotal: Float
      meetingsInCycle: Float
      perShare: Float
      serviceFee: Float
      loanLimit: Float
      loans: Float
      shares: Float
      owner: User
      admin: User
      members: JSON
   }

   type Activity {
      last300Days: [Float]
      last200Days: [Float]
      last105Days: [Float]
   }

   type GroupActivity {
      meetingActivity: Activity
      shareoutActivity: Activity
   }

   type GroupData {
      group(group: String!): Group
   }

   type NGOGroupData {
      groupData(ngo: String!): [Group]
   }

   union GroupSearch = Group | Error

   input GroupSearchInput {
      group: String!
   }

   extend type Query {
      groupStats: GroupStats
      groupEngagement: GroupEngagement
      groupSearch(input: GroupSearchInput!): GroupSearch
      ngoGroupData: NGOGroupData
      groupActivity: GroupActivity
   }
`;
