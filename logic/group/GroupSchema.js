const { gql } = require("apollo-server");

const GroupSchema = gql`
  type GroupNumberDay {
    day: Day!
    count: Float!
  }

  type GroupStats {
    signups: [GroupNumberDay]!
  }

  extend type Query {
    groupsTotal: Float!
    groupsLastMonth: GroupStats
    groupsLastThreeMonths: GroupStats
    groupsLastSixMonths: GroupStats
    groupsLastYear: GroupStats
  }
`;

module.exports = GroupSchema;
