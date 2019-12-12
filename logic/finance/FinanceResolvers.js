const { fetchCurrencyStats } = require("../../data/actions/FinanceActions");

const financeResolvers = {
  Query: {
    financeStats: async (parent, args, context, info) => {
      const currencyStats = await fetchCurrencyStats();
      
      const currencyTotal = currencyStats.length;

      return {
        currencyTotal,
        currencyStats: currencyStats
      };
    }
  }
};

module.exports = financeResolvers;
