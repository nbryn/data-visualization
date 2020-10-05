import {fetchFromServer} from '../Fetch';
import {LastYearDTO} from '../DTOs';

export const fetchEventsLastYear = async (): Promise<LastYearDTO[]> => {
   const data = `query{
      accountData{
        eventsLastYear{
            count
            month
            year
          }     
        }  
  }`;

   const response: LastYearDTO[] = await fetchFromServer<LastYearDTO[]>(
      'accountData',
      data,
      'eventsLastYear'
   );

   return response;
};
