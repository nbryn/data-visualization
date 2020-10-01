import {fetchFromServer} from '../Fetch';
import {AccountViewDTO} from './AccountViewDTO';

export const fetchAccountData = async (): Promise<AccountViewDTO> => {
   const data = `query {
        accountData {
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
          dollarEventCount
          teamDollarEventData {
            name
            count
          }
        }
      }`;

   const response: AccountViewDTO = await fetchFromServer<AccountViewDTO>('accountData', data);

   return response;
};
