import * as FinanceMapper from '../../../data/mappers/FinanceMapper';
import {actionRunner} from '../../util/ActionRunner';
import {CountDTO, FinanceDataDTO, LastMonthDTO, LastYearDTO} from '../../util/DTOs';

export const financeResolvers = {
   Query: {
      financeStats: async (): Promise<FinanceDataDTO> => {
         return actionRunner<FinanceDataDTO>(async () => {
            const mostShares = await FinanceMapper.fetchGroupsWithMostShares();
            const currencyData = await FinanceMapper.fetchCurrencyStats();
            const etbData = await FinanceMapper.fetchETBLoanData();

            return {
               mostShares,
               currencyData,
               etbData,
            };
         });
      },
   },
   FinanceStats: {
      mostSharesData: (root: FinanceDataDTO): CountDTO => {
         return root.mostShares[0];
      },
      mostShares: (root: FinanceDataDTO): number => {
         return root.mostShares[0].count;
      },
      shareStats: (root: FinanceDataDTO): CountDTO[] => {
         return root.mostShares;
      },
      numberOfCurrencies: async (root: FinanceDataDTO): Promise<number> => {
         return root.currencyData.length;
      },
      currencyStats: async (root: FinanceDataDTO): Promise<CountDTO[]> => {
         return root.currencyData;
      },
      groupEtbLoan: (root: FinanceDataDTO): CountDTO[] => {
         return root.etbData;
      },
      etbOnLoan: async (root: FinanceDataDTO): Promise<number> => {
         let etbOnLoan = 0;
         root.etbData.forEach((x: CountDTO) => (etbOnLoan += x.count));

         return etbOnLoan;
      },

      loanTotal: async (): Promise<number> => {
         return actionRunner<number>(async () => {
            const loanTotal = await FinanceMapper.fetchTotalLoanCount();

            return loanTotal;
         });
      },
      loansLastMonth: async (): Promise<LastMonthDTO[]> => {
         return actionRunner<LastMonthDTO[]>(async () => {
            const loansLastMonth = await FinanceMapper.fetchLoansLastMonth();

            return loansLastMonth;
         });
      },
      loansLastYear: async (): Promise<LastYearDTO[]> => {
         return actionRunner<LastYearDTO[]>(async () => {
            const loansLastYear = await FinanceMapper.fetchLoansLastYear();

            return loansLastYear;
         });
      },
      shareTotal: async (): Promise<number> => {
         return actionRunner<number>(async () => {
            const shareTotal = await FinanceMapper.fetchTotalShareCount();

            return shareTotal;
         });
      },
   },
};
