const {
  fetchCurrencyStats,
  fetchSharesPerGroup,
  fetchShareStats,
  fetchLoanTotal,
  fetchLoansLastMonth,
  fetchLoansLastYear
} = require("../../data/mappers/FinanceMapper");

const financeResolvers = {
  Query: {
    financeStats: async (parent, args, context, info) => {
      const currencyResult = await fetchCurrencyStats();

      const sharesPerGroup = await fetchSharesPerGroup();

      const etbStats = await fetchShareStats();

      const loanTotal = await fetchLoanTotal();

      const loansLastMonth = await fetchLoansLastMonth();

      const loansLastYear = await fetchLoansLastYear();

      const shareTotal = sharesPerGroup.shareTotal;
      const etbOnLoan = etbStats.totalETBOnLoan;
      const groupWithMostShares = sharesPerGroup.mostShares;
      const currencyTotal = currencyResult.length;

      console.log(etbStats);

      return {
        currencyTotal,
        currencyStats: currencyResult,
        shareTotal,
        mostShares: groupWithMostShares,
        sharesPerGroup: sharesPerGroup.shareStats,
        loanTotal,
        loansLastYear: { data: loansLastYear },
        loansLastMonth: { data: loansLastMonth },
        etbOnLoan,
        onLoanPerGroup: etbStats.etbOnLoan
      };
    }
  }
};

module.exports = financeResolvers;
