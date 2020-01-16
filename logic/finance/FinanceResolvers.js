const { fetchDailyData } = require("../../data/fetch/fetchDailyData");
const { fetchMonthlyData } = require("../../data/fetch/fetchMonthlyData");
const { fetchTotal } = require("../../data/fetch/fetchTotal");
const {
  getCurrencyStats,
  getShareStats,
  getEtbLoanStats
} = require("./FinanceService");

const financeResolvers = {
  Query: {
    financeStats: (root, context) => ({ root, context })
  },

  FinanceStats: {
    currencyStats: async ({ root, context }) => {
      const currencyStats = await getCurrencyStats();

      const numberOfCurrencies = currencyStats.length;

      return {
        numberOfCurrencies: numberOfCurrencies,
        currency: currencyStats
      };
    },

    loanTotal: async ({ root, context }) => {
      const loanTotal = await fetchTotal("groupmeetingloans");

      return loanTotal;
    },
    loansLastMonth: async ({ root, context }) => {
      const loansLastMonth = await fetchDailyData(
        "groupmeetingloans",
        "registrationDate"
      );

      return {
        data: loansLastMonth
      };
    },
    loansLastYear: async ({ root, context }) => {
      const loansLastYear = await fetchMonthlyData(
        "groupmeetingloans",
        "registrationDate"
      );

      return {
        data: loansLastYear
      };
    },
    shareStats: async ({ root, context }) => {
      const shareStats = await getShareStats();

      const { shareTotal } = shareStats;
      const { mostShares } = shareStats;

      return {
        shareTotal: shareTotal,
        groupShares: shareStats.shareStats,
        mostShares: mostShares
      };
    },
    etbStats: async ({ root, context }) => {
      const etbStats = await getEtbLoanStats();

      const { ETBLoanTotal } = etbStats;

      return {
        etbOnLoan: ETBLoanTotal,
        groupLoan: etbStats.ETBLoanGroup
      };
    }
  }
};

module.exports = financeResolvers;
