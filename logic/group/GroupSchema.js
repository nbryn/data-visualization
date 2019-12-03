const { gql } = require("apollo-server");

const GroupSchema = gql`
  type GroupNumberDay {
    day: Day!
    count: Float!
  }

  type GroupNumberMonth {
    month: JSON
    count: Float!
  }

  type GroupLastMonthStats {
    signups: [GroupNumberDay]!
  }

  type GroupLastYearStats {
    signups: [GroupNumberMonth]!
  }

  extend type Query {
    groupsTotal: Float!
    groupsLastMonth: GroupLastMonthStats
    groupsLastYear: GroupLastYearStats
  }
`;

module.exports = GroupSchema;
