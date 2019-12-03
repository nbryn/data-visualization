const { gql } = require("apollo-server");

const GroupSchema = gql`
  type GroupNumberDay {
    day: Day!
    count: Float!
  }

  type GroupStats {
    numberOfUsers: Float!
    signups: [UserNumberDay]!
  }

  extend type Query {
    groupStats: GroupStats
  }
`;

module.exports = GroupSchema;
