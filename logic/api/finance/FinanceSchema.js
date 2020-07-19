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

  type BoxBalanceStats {
    totalBoxBalance: Float
    groupWithMost: Float
  }

  type FinanceStats {
    currencyTotal: Float
    currencyStats: CurrencyStats
    loanTotal: Float
    loansLastMonth: [NumberDay]
    loansLastYear: [NumberMonth]
    shareStats: ShareStats
    etbStats: EtbStats
    boxBalanceStats: BoxBalanceStats
  }

  extend type Query {
    financeStats: FinanceStats
  }
`;

module.exports = FinanceSchema;
