import {fetchFromServer} from '../Fetch';
import {LastYearDTO} from '../DTO';

export const fetchEventsLastYear = async (): Promise<LastYearDTO[]> => {
   const data = `query{
      financeData{
        eventsLastYear{
            count
            month
            year
          }     
        }  
  }`;

   const response: LastYearDTO[] = await fetchFromServer<LastYearDTO[]>('financeData', data, 'eventsLastYear');

   return response;
};
