const {
  fetchCurrencyStats,
  fetchShareStats,
  fetchEtbStats,
  fetchLoanTotal,
  fetchLoansLastMonth,
  fetchLoansLastYear
} = require("../../data/mappers/FinanceMapper");

const financeResolvers = {
  Query: {
    financeStats: (root, context) => ({ root, context })
  },

  FinanceStats: {
    currencyStats: async ({ root, context }) => {
      const currencyResult = await fetchCurrencyStats();

      const numberOfCurrencies = currencyResult.length;

      return {
        numberOfCurrencies: numberOfCurrencies,
        currency: currencyResult
      };
    },

    loanTotal: async ({ root, context }) => {
      const loanTotal = await fetchLoanTotal();

      return loanTotal;
    },
    loansLastMonth: async ({ root, context }) => {
      const loansLastMonth = await fetchLoansLastMonth();

      return {
        data: loansLastMonth
      };
    },
    loansLastYear: async ({ root, context }) => {
      const loansLastYear = await fetchLoansLastYear();

      return {
        data: loansLastYear
      };
    },
    shareStats: async ({ root, context }) => {
      const shareStats = await fetchShareStats();

      const { shareTotal } = shareStats;
      const { mostShares } = shareStats;

      return {
        shareTotal: shareTotal,
        groupShares: shareStats.shareStats,
        mostShares: mostShares
      };
    },
    etbStats: async ({ root, context }) => {
      const etbStats = await fetchEtbStats();

      const { totalETBOnLoan } = etbStats;

      return {
        etbOnLoan: totalETBOnLoan,
        groupLoan: etbStats.etbOnLoan
      };
    }
  }
};

module.exports = financeResolvers;
