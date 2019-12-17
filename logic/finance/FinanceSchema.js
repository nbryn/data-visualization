const { gql } = require("apollo-server");

const FinanceSchema = gql`
  type CurrencyStats {
    name: String
    count: Float
  }

  type LoanStats {
    name: String
    count: Float
  }

  type ShareStats {
    name: String
    count: Float
  }

  type MostShares {
    groupName: String
    count: Float
  }

  type FinanceStats {
    currencyTotal: Float
    currencyStats: [CurrencyStats]
    loanTotal: Float
    loanStats: [LoanStats]
    loansLastMonth: LastMonth
    loansLastYear: LastYear
    shareTotal: Float
    mostShares: MostShares
    shareStats: [ShareStats]
  }

  extend type Query {
    financeStats: FinanceStats
  }
`;

module.exports = FinanceSchema;
