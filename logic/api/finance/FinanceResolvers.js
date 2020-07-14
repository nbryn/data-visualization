const actionRunner = require("../../util/ActionRunner");
const {
  calculateEtbLoanStats,
  calculateShareStats,
  getCurrencyStats,
  
} = require("./FinanceService");
const { fetchDailyData } = require("../../../data/common/fetchDailyData");
const { fetchMonthlyData } = require("../../../data/common/fetchMonthlyData");
const { fetchTotal } = require("../../../data/common/fetchTotal");

const financeResolvers = {
  Query: {
    financeStats: (root, context) => ({ root, context }),
  },

  FinanceStats: {
    currencyStats: async ({ root, context }) => {
      return actionRunner(async () => {
        const currencyStats = await getCurrencyStats();

        const numberOfCurrencies = currencyStats.length;

        return {
          numberOfCurrencies: numberOfCurrencies,
          currency: currencyStats,
        };
      });
    },

    loanTotal: async ({ root, context }) => {
      return actionRunner(async () => {
        const loanTotal = await fetchTotal("GroupMeetingLoan");

        return loanTotal;
      });
    },
    loansLastMonth: async ({ root, context }) => {
      return actionRunner(async () => {
        const loansLastMonth = await fetchDailyData(
          "GroupMeetingLoan",
          "registrationDate"
        );

        return {
          data: loansLastMonth,
        };
      });
    },
    loansLastYear: async ({ root, context }) => {
      return actionRunner(async () => {
        const loansLastYear = await fetchMonthlyData(
          "GroupMeetingLoan",
          "registrationDate"
        );

        return {
          data: loansLastYear,
        };
      });
    },
    shareStats: async ({ root, context }) => {
      return actionRunner(async () => {
        const shareStats = await calculateShareStats();

        const { mostShares, shareTotal } = shareStats;

        return {
          shareTotal: shareTotal,
          groupShares: shareStats.shareStats,
          mostShares: mostShares,
        };
      });
    },
    etbStats: async ({ root, context }) => {
      return actionRunner(async () => {
        const etbStats = await calculateEtbLoanStats();

        const { ETBLoanTotal } = etbStats;

        return {
          etbOnLoan: ETBLoanTotal,
          groupLoan: etbStats.ETBLoanGroup,
        };
      });
    },
  },
};

module.exports = financeResolvers;
