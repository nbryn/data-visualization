const { gql } = require("apollo-server");

const FinanceSchema = gql`
  type Currency {
    name: String
    totalAmount: Float
  }

  type FinanceStats {
    currencyTotal: Float
    currencyStats: [Currency]
  }

  extend type Query {
    financeStats: FinanceStats
  }
`;

module.exports = FinanceSchema;
