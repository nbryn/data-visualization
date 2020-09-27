import {fetchFromServer} from '../Fetch';
import {FinanceViewDTO} from './FinanceViewDTO';

export const fetchFinanceData = async (): Promise<FinanceViewDTO> => {
   const data = `query {
        financeData {
          numberOfCurrencies
          currencyData {
            name
            count
          }
          eventTotal
          eventsLastMonth {
            count
            day {
              day
              month
              year
            }
          }
          eventsLastYear {
            count
            month
            year
          }
          meetingTotal
          mostMeetingData {
            name
            count
          }
          teamWithMostMeetings
          meetingData {
            name
            count
          }
          etbEventCount
          teamETBEventData {
            name
            count
          }
        }
      }`;

   const response: FinanceViewDTO = await fetchFromServer<FinanceViewDTO>('financeData', data);

   return response;
};
