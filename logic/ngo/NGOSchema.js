const { gql } = require("apollo-server");

const NGOSchema = gql`
  type Group {
    name: String
    Cycle: Float
    Meetings: Float
    Shares: Float
    Loans: Float
    Agent: String
  }

  type GroupData {
    groups: [Group]
  }

  type Query {
    _empty: String
  }
`;

module.exports = NGOSchema;
