const { gql } = require('apollo-server');

const FinanceSchema = gql`
  type Data {
    name: String
    count: Float
  }

  type BoxBalanceStats {
    totalBoxBalance: Float
    groupWithMost: Float
  }

  type FinanceStats {
    numberOfCurrencies: Float
    currencyStats: [Data]
    loanTotal: Float
    loansLastMonth: [NumberDay]
    loansLastYear: [NumberMonth]
    shareTotal: Float
    mostShares: Data
    shareStats: [Data]
    etbOnLoan: Float
    groupEtbLoan: [Data]
    boxBalanceStats: BoxBalanceStats
  }

  extend type Query {
    financeStats: FinanceStats
  }
`;

module.exports = FinanceSchema;
