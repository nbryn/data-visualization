const { gql } = require("apollo-server");

const GroupSchema = gql`
  type GroupSize {
    value: String
    count: Float
  }

  type GroupPerCountry {
    name: String
    count: Float
  }

  type GroupPerNGO {
    name: String
    count: Float
  }

  type GroupMeetingStats {
    name: String
    regDate: String
    memberCount: Float
    meetingSupposed: Float
    meetingActual: Float
  }

  type GroupActivityStats {
    testGroups: Float
    lastMonth: Float
    lastTwoMonths: Float
    overTwoMonths: Float
  }

  type GroupStats {
    groupTotal: Float
    groupSize: [GroupSize]
    groupsLastMonth: LastMonth
    groupsLastYear: LastYear
    groupsCountry: [GroupPerCountry]
    groupsNGO: [GroupPerNGO]
  }

  extend type Query {
    groupStats: GroupStats
    groupMeetingStats: [GroupMeetingStats]
    groupActivityStats: GroupActivityStats
  }
`;

module.exports = GroupSchema;
