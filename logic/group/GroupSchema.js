const { gql } = require("apollo-server");

const GroupSchema = gql`
  type GroupSize {
    numberOfMembers: Float
    count: Float
  }

  type GroupCountry {
    name: String
    count: Float
  }

  type GroupStats {
    groupTotal: Float
    groupSize: [GroupSize]
    groupsLastMonth: LastMonth
    groupsLastYear: LastYear
    groupsCountry: GroupCountry
  }

  extend type Query {
    groupStats: GroupStats
  }
`;

module.exports = GroupSchema;
