import * as FinanceMapper from '../../../data/mappers/FinanceMapper';
import {actionRunner} from '../../util/ActionRunner';
import {CountDTO, AccountDataDTO, LastMonthDTO, LastYearDTO} from '../../util/DTOs';

export const accountResolvers = {
   Query: {
      accountData: async (): Promise<AccountDataDTO> => {
         return actionRunner<AccountDataDTO>(async () => {
            const mostMeetings = await FinanceMapper.fetchTeamsWithMostMeetings();
            const currencyData = await FinanceMapper.fetchCurrencyData();
            const dollarData = await FinanceMapper.fetchDollarEventData();

            return {
               mostMeetings,
               currencyData,
               dollarData,
            };
         });
      },
   },
   AccountData: {
      mostMeetingData: (root: AccountDataDTO): CountDTO => {
         return root.mostMeetings[0];
      },
      teamWithMostMeetings: (root: AccountDataDTO): number => {
         return root.mostMeetings[0].count;
      },
      meetingData: (root: AccountDataDTO): CountDTO[] => {
         return root.mostMeetings.sort((a, b) => a.count - b.count);
      },
      numberOfCurrencies: async (root: AccountDataDTO): Promise<number> => {
         return root.currencyData.length;
      },
      currencyData: async (root: AccountDataDTO): Promise<CountDTO[]> => {
         return root.currencyData;
      },
      teamDollarEventData: (root: AccountDataDTO): CountDTO[] => {
         return root.dollarData;
      },
      dollarEventCount: async (root: AccountDataDTO): Promise<number> => {
         let dollarEventCount = 0;
         root.dollarData.forEach((x: CountDTO) => (dollarEventCount += x.count));

         return dollarEventCount;
      },

      eventTotal: async (): Promise<number> => {
         return actionRunner<number>(async () => {
            const eventTotal = await FinanceMapper.fetchTotalEventCount();

            return eventTotal;
         });
      },
      eventsLastMonth: async (): Promise<LastMonthDTO[]> => {
         return actionRunner<LastMonthDTO[]>(async () => {
            const eventsLastMonth = await FinanceMapper.fetchEventLastMonth();

            return eventsLastMonth;
         });
      },
      eventsLastYear: async (): Promise<LastYearDTO[]> => {
         return actionRunner<LastYearDTO[]>(async () => {
            const eventsLastYear = await FinanceMapper.fetchEventsLastYear();

            return eventsLastYear;
         });
      },
      meetingTotal: async (): Promise<number> => {
         return actionRunner<number>(async () => {
            const meetingTotal = await FinanceMapper.fetchTotalMeetingCount();

            return meetingTotal;
         });
      },
   },
};
