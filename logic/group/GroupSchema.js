const { gql } = require("apollo-server");

const GroupSchema = gql`
  type GroupSize {
    value: String
    count: Float
  }

  type GroupsPerCountry {
    name: String
    count: Float
  }

  type GroupsPerNGO {
    name: String
    count: Float
  }

  type GroupStats {
    groupTotal: Float
    groupSize: [GroupSize]
    groupsLastMonth: LastMonth
    groupsLastYear: LastYear
    groupsCountry: [GroupsPerCountry]
    groupsNGO: [GroupsPerNGO]
  }

  type GroupMeetingFrequency {
    value: String
    count: Float
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
    groupMeetingFrequency: [GroupMeetingFrequency]
    groupMeetingStats: [GroupMeetingStats]
  }


  type Group {
    id: String
    regDate: String
    name: String
    currency: String
    lastMeeting: String
    cycle: Float
    boxBalance: Float
    meetingsTotal: Float
    meetingsInCycle: Float
    perShare: Float
    serviceFee: Float
    loanLimit: Float
    shares: Float
    loans: Float
    owner: User
    admin: User
    members: JSON
  }

  type NGOGroupData {
    groupData(ngo: String!): [Group]
  }

  extend type Query {
    groupStats: GroupStats
    groupEngagement: GroupEngagement
    ngoGroupData: NGOGroupData
  }
`;

module.exports = GroupSchema;
