import {fetchFromServer} from '../Fetch';
import {LastYearDTO} from '../DTOs';

export const fetchMatchesLastYear = async (): Promise<LastYearDTO[]> => {
   const data = `query{
      matchData{
        matchesLastYear{
            year
            month
            count
        }   
      }
    }`;

   const response: LastYearDTO[] = await fetchFromServer<LastYearDTO[]>(
      'matchData',
      data,
      'matchesLastYear'
   );

   return response;
};
