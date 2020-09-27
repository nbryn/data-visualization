import {fetchFromServer} from '../Fetch';
import {LastMonthDTO} from '../DTO';

export const fetchEventsLastMonth = async (): Promise<LastMonthDTO[]> => {
   const data = `query{
    financeData{
      eventsLastMonth{
          count
          day{
            day
            month
            year
          }
        }     
      }  
}`;

   const response: LastMonthDTO[] = await fetchFromServer<LastMonthDTO[]>('financeData', data, 'eventsLastMonth');

   return response;
};
