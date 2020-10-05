import {fetchFromServer} from '../Fetch';
import {LastMonthDTO} from '../DTOs';

export const fetchEventsLastMonth = async (): Promise<LastMonthDTO[]> => {
   const data = `query{
    accountData{
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

   const response: LastMonthDTO[] = await fetchFromServer<LastMonthDTO[]>(
      'accountData',
      data,
      'eventsLastMonth'
   );

   return response;
};
