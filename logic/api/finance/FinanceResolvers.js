const actionRunner = require('../../util/ActionRunner');
const {
  calculateEtbLoanStats,
  calculateShareStats,
  getCurrencyStats
} = require('./FinanceService');
const { fetchDailyData } = require('../../../data/common/fetchDailyData');
const { fetchMonthlyData } = require('../../../data/common/fetchMonthlyData');
const { fetchTotal } = require('../../../data/common/fetchTotal');

const financeResolvers = {
  Query: {
    financeStats: (root, context) => ({ root, context })
  },

  FinanceStats: {
    numberOfCurrencies: async ({ root, context }) => {
      return actionRunner(async () => {
        const currencyStats = await getCurrencyStats();

        const numberOfCurrencies = currencyStats.length;

        return numberOfCurrencies;
      });
    },
    currencyStats: async ({ root, context }) => {
      return actionRunner(async () => {
        const currency = await getCurrencyStats();

        return currency;
      });
    },

    loanTotal: async ({ root, context }) => {
      return actionRunner(async () => {
        const loanTotal = await fetchTotal('GroupMeetingLoan');

        return loanTotal;
      });
    },
    loansLastMonth: async ({ root, context }) => {
      return actionRunner(async () => {
        const loansLastMonth = await fetchDailyData(
          'GroupMeetingLoan',
          'registrationDate'
        );

        return loansLastMonth;
      });
    },
    loansLastYear: async ({ root, context }) => {
      return actionRunner(async () => {
        const loansLastYear = await fetchMonthlyData(
          'GroupMeetingLoan',
          'registrationDate'
        );

        return loansLastYear;
      });
    },
    shareTotal: async ({ root, context }) => {
      return actionRunner(async () => {
        const shareStats = await calculateShareStats();

        const { shareTotal } = shareStats;

        return shareTotal;
      });
    },
    mostSharesData: async ({ root, context }) => {
      return actionRunner(async () => {
        const shareStats = await calculateShareStats();

        const { mostShares } = shareStats;

        return mostShares;
      });
    },
    mostShares: async ({ root, context }) => {
      return actionRunner(async () => {
        const shareStats = await calculateShareStats();

        const { mostShares } = shareStats;

        return mostShares.count;
      });
    },
    shareStats: async ({ root, context }) => {
      return actionRunner(async () => {
        const shareStats = await calculateShareStats();

        return shareStats.shareStats;
      });
    },

    groupEtbLoan: async ({ root, context }) => {
      return actionRunner(async () => {
        const etbStats = await calculateEtbLoanStats();

        const { groupEtbLoan } = etbStats;

        return groupEtbLoan;
      });
    },
    etbOnLoan: async ({ root, context }) => {
      return actionRunner(async () => {
        const etbStats = await calculateEtbLoanStats();

        const { etbOnLoan } = etbStats;

        return etbOnLoan;
      });
    }
  }
};

module.exports = financeResolvers;
