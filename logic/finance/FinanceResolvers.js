const {
  fetchCurrencyStats,
  fetchShareStats,
  fetchLoanTotal,
  fetchLoansLastMonth,
  fetchLoansLastYear
} = require("../../data/mappers/FinanceMapper");

const financeResolvers = {
  Query: {
    financeStats: async (parent, args, context, info) => {
      const currencyResult = await fetchCurrencyStats();

      const shareResult = await fetchShareStats();

      const loanTotal = await fetchLoanTotal();

      const loansLastMonth = await fetchLoansLastMonth();

      const loansLastYear = await fetchLoansLastYear();

      const shareTotal = shareResult.shareTotal;
      const groupWithMostShares = shareResult.mostShares;
      const currencyTotal = currencyResult.length;

      return {
        currencyTotal,
        currencyStats: currencyResult,
        shareTotal,
        mostShares: groupWithMostShares,
        shareStats: shareResult.shareStats,
        loanTotal,
        loansLastYear: { data: loansLastYear },
        loansLastMonth: { data: loansLastMonth }
      };
    }
  }
};

module.exports = financeResolvers;
