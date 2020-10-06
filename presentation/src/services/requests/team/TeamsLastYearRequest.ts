import {fetchFromServer} from '../Fetch';
import {LastYearDTO} from '../DTOs';

export const fetchTeamsLastYear = async (): Promise<LastYearDTO[]> => {
   const data = `query{
      teamData{
        teamsLastYear{
          year
          month
          count
          }
      }
    }`;

   const response: LastYearDTO[] = await fetchFromServer<LastYearDTO[]>(
      'teamData',
      data,
      'teamsLastYear'
   );

   return response;
};
