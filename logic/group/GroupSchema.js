const { gql } = require("apollo-server");

const GroupSchema = gql`
  type GroupStats {
    groupTotal: Float
    groupsLastMonth: LastMonth
    groupsLastYear: LastYear
  }

  extend type Query {
    groupStats: GroupStats
  }
`;

module.exports = GroupSchema;
