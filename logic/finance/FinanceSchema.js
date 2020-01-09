const { gql } = require("apollo-server");

const FinanceSchema = gql`
  type Currency {
    name: String
    count: Float
  }

  type CurrencyStats {
    numberOfCurrencies: Float
    currency: [Currency]
  }

  type LoanStats {
    name: String
    count: Float
  }

  type GroupShares {
    name: String
    count: Float
  }

  type MostShares {
    name: String
    count: Float
  }

  type ShareStats {
    shareTotal: Float
    mostShares: MostShares
    groupShares: [GroupShares]
  }

  type GroupLoan {
    name: String
    count: Float
  }

  type EtbStats {
    etbOnLoan: Float
    groupLoan: [GroupLoan]
  }

  type FinanceStats {
    currencyTotal: Float
    currencyStats: CurrencyStats
    loanTotal: Float
    loansLastMonth: LastMonth
    loansLastYear: LastYear
    shareStats: ShareStats
    etbStats: EtbStats
  }

  extend type Query {
    financeStats: FinanceStats
  }
`;

module.exports = FinanceSchema;
