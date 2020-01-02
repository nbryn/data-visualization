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

  type GroupActivity {
    name: String
    regDate: String
    meetingSupposed: Float
    meetingActual: Float
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
    groupActivity: [GroupActivity]
  }
`;

module.exports = GroupSchema;
