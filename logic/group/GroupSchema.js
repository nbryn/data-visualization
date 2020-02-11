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

  type GroupData {
    group(group: String!): Group
  }

  type NGOGroupData {
    groupData(ngo: String!): [Group]
  }

  extend type Query {
    groupStats: GroupStats
    groupEngagement: GroupEngagement
    groupData: GroupData
    ngoGroupData: NGOGroupData
  }
`;

module.exports = GroupSchema;
