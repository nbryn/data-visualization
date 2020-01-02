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

  type SharesPerGroup {
    name: String
    count: Float
  }

  type OnLoanPerGroup {
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
    loansLastMonth: LastMonth
    loansLastYear: LastYear
    shareTotal: Float
    sharesPerGroup: [SharesPerGroup]
    mostShares: MostShares
    etbOnLoan: Float
    onLoanPerGroup: [OnLoanPerGroup]
  }

  extend type Query {
    financeStats: FinanceStats
  }
`;

module.exports = FinanceSchema;
