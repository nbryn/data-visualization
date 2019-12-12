const {
  fetchCurrencyStats,
  fetchShareStats
} = require("../../data/actions/FinanceActions");

const financeResolvers = {
  Query: {
    financeStats: async (parent, args, context, info) => {
      const currencyResult = await fetchCurrencyStats();

      const shareResult = await fetchShareStats();

      const shareTotal = shareResult.shareTotal;
      const groupWithMostShares = shareResult.mostShares;
      const currencyTotal = currencyResult.length;

    //   console.log(groupWithMostShares);
    //   console.log(shareResult);

      return {
        currencyTotal,
        currencyStats: currencyResult,
        shareTotal,
        mostShares: groupWithMostShares,
        shareStats: shareResult.shareStats
      };
    }
  }
};

module.exports = financeResolvers;
