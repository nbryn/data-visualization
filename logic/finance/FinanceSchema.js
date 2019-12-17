const { gql } = require("apollo-server");

const FinanceSchema = gql`
  type Currency {
    name: String
    totalAmount: Float
  }

  type Share {
    name: String
    totalAmount: Float
  }

  type MostShares {
    groupName: String
    amount: Float
  }

  type FinanceStats {
    currencyTotal: Float
    currencyStats: [Currency]
    shareTotal: Float
    mostShares: MostShares
    shareStats: [Share]
  }

  extend type Query {
    financeStats: FinanceStats
  }
`;

module.exports = FinanceSchema;
