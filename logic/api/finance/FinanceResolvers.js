const { fetchDailyData } = require("../../../data/common/fetchDailyData");
const { fetchMonthlyData } = require("../../../data/common/fetchMonthlyData");
const { fetchTotal } = require("../../../data/common/fetchTotal");
const {
  getCurrencyStats,
  calculateShareStats,
  calculateEtbLoanStats,
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
      const loanTotal = await fetchTotal("GroupMeetingLoan");

      return loanTotal;
    },
    loansLastMonth: async ({ root, context }) => {
      const loansLastMonth = await fetchDailyData(
        "GroupMeetingLoan",
        "registrationDate"
      );

      return {
        data: loansLastMonth
      };
    },
    loansLastYear: async ({ root, context }) => {
      const loansLastYear = await fetchMonthlyData(
        "GroupMeetingLoan",
        "registrationDate"
      );

      return {
        data: loansLastYear
      };
    },
    shareStats: async ({ root, context }) => {
      const shareStats = await calculateShareStats();

      const { shareTotal } = shareStats;
      const { mostShares } = shareStats;

      return {
        shareTotal: shareTotal,
        groupShares: shareStats.shareStats,
        mostShares: mostShares
      };
    },
    etbStats: async ({ root, context }) => {
      const etbStats = await calculateEtbLoanStats();

      const { ETBLoanTotal } = etbStats;

      return {
        etbOnLoan: ETBLoanTotal,
        groupLoan: etbStats.ETBLoanGroup
      };
    }
  }
};

module.exports = financeResolvers;
