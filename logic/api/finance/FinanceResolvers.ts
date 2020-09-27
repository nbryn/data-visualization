import * as FinanceMapper from '../../../data/mappers/FinanceMapper';
import {actionRunner} from '../../util/ActionRunner';
import {CountDTO, FinanceDataDTO, LastMonthDTO, LastYearDTO} from '../../util/DTOs';

export const financeResolvers = {
   Query: {
      financeData: async (): Promise<FinanceDataDTO> => {
         return actionRunner<FinanceDataDTO>(async () => {
            const mostShares = await FinanceMapper.fetchTeamsWithMostEvents();
            const currencyData = await FinanceMapper.fetchCurrencyData();
            const etbData = await FinanceMapper.fetchETBEventData();

            return {
               mostShares,
               currencyData,
               etbData,
            };
         });
      },
   },
   FinanceData: {
      mostMeetingData: (root: FinanceDataDTO): CountDTO => {
         return root.mostShares[0];
      },
      teamWithMostMeetings: (root: FinanceDataDTO): number => {
         return root.mostShares[0].count;
      },
      meetingData: (root: FinanceDataDTO): CountDTO[] => {
         return root.mostShares;
      },
      numberOfCurrencies: async (root: FinanceDataDTO): Promise<number> => {
         return root.currencyData.length;
      },
      currencyData: async (root: FinanceDataDTO): Promise<CountDTO[]> => {
         return root.currencyData;
      },
      teamETBEventData: (root: FinanceDataDTO): CountDTO[] => {
         return root.etbData;
      },
      etbEventCount: async (root: FinanceDataDTO): Promise<number> => {
         let etbEventCount = 0;
         root.etbData.forEach((x: CountDTO) => (etbEventCount += x.count));

         return etbEventCount;
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
