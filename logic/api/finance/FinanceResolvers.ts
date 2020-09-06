import * as FinanceMapper from '../../../data/mappers/FinanceMapper';
import {actionRunner} from '../../util/ActionRunner';

const {calculateEtbLoanStats, calculateShareStats, getCurrencyStats} = require('./FinanceService');

export const financeResolvers = {
   Query: {
      financeStats: () => ({}),
   },

   FinanceStats: {
      numberOfCurrencies: async () => {
         return actionRunner(async () => {
            const currencyStats = await getCurrencyStats();

            const numberOfCurrencies = currencyStats.length;

            return numberOfCurrencies;
         });
      },
      currencyStats: async () => {
         return actionRunner(async () => {
            const currency = await getCurrencyStats();

            return currency;
         });
      },

      loanTotal: async (): Promise<number> => {
         return actionRunner(async () => {
            const loanTotal = await FinanceMapper.fetchTotalLoanCount();

            return loanTotal;
         });
      },
      loansLastMonth: async () => {
         return actionRunner(async () => {
            const loansLastMonth = await FinanceMapper.fetchLoansLastMonth();

            return loansLastMonth;
         });
      },
      loansLastYear: async () => {
         return actionRunner(async () => {
            const loansLastYear = await FinanceMapper.fetchLoansLastYear();

            return loansLastYear;
         });
      },
      shareTotal: async () => {
         return actionRunner(async () => {
            const shareStats = await calculateShareStats();

            const {shareTotal} = shareStats;

            return shareTotal;
         });
      },
      mostSharesData: async () => {
         return actionRunner(async () => {
            const shareStats = await calculateShareStats();

            const {mostShares} = shareStats;

            return mostShares;
         });
      },
      mostShares: async () => {
         return actionRunner(async () => {
            const shareStats = await calculateShareStats();

            const {mostShares} = shareStats;

            return mostShares.count;
         });
      },
      shareStats: async () => {
         return actionRunner(async () => {
            const shareStats = await calculateShareStats();

            return shareStats.shareStats;
         });
      },

      groupEtbLoan: async () => {
         return actionRunner(async () => {
            const etbStats = await calculateEtbLoanStats();

            const {groupEtbLoan} = etbStats;

            return groupEtbLoan;
         });
      },
      etbOnLoan: async () => {
         return actionRunner(async () => {
            const etbStats = await calculateEtbLoanStats();

            const {etbOnLoan} = etbStats;

            return etbOnLoan;
         });
      },
   },
};
