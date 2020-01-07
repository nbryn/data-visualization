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

  type GroupStats {
    groupTotal: Float
    groupSize: [GroupSize]
    groupsLastMonth: LastMonth
    groupsLastYear: LastYear
    groupsCountry: [GroupPerCountry]
    groupsNGO: [GroupPerNGO]
  }

  type GroupMeetingStats {
    name: String
    regDate: String
    memberCount: Float
    meetingSupposed: Float
    meetingActual: Float
  }

  extend type Query {
    groupStats: GroupStats
    groupMeetingStats: [GroupMeetingStats]
  }
`;

module.exports = GroupSchema;
