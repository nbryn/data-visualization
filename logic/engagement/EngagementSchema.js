const { gql } = require("apollo-server");

const EngagementSchema = gql`
  type GroupActivity {
    value: String
    count: Float
  }

  type EngagementStats {
    activeGroups: Float
    groupActivity: [GroupActivity]
  }

  extend type Query {
    engagementStats: EngagementStats
  }
`;

module.exports = EngagementSchema;
