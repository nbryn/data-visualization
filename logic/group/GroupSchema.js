const { gql } = require("apollo-server");

const GroupSchema = gql`

  type GroupNumberMonth {
    month: Float!
    count: Float!
  }

  type GroupStats {
    signups: [GroupNumberMonth]!
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
