const { gql } = require("apollo-server");

const NGOSchema = gql`
  type GroupsPerNGO {
    name: String
    count: Float
  }

  type GroupsPerUser {
    id: String
    name: String
    count: Float
  }

  type NGOStats {
    groupsNGO: [GroupsPerNGO]
    groupsUser: [GroupsPerUser]
  }

  extend type Query {
    ngoStats: NGOStats
  }
`;

module.exports = NGOSchema;
