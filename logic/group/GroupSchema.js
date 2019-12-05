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

  type GroupLastMonth {
    signups: [GroupNumberDay]!
  }

  type GroupLastYear {
    signups: [GroupNumberMonth]!
  }

  extend type Query {
    groupsTotal: Float!
    groupsLastMonth: GroupLastMonth
    groupsLastYear: GroupLastYear
  }
`;

module.exports = GroupSchema;
