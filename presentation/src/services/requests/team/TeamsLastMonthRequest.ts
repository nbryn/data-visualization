import {fetchFromServer} from '../Fetch';
import {LastMonthDTO} from '../DTO';

export const fetchTeamsLastMonth = async (): Promise<LastMonthDTO[]> => {
   const data = `query{
      teamData{  
        teamsLastMonth{
            count
            day{
              year
              month
              day
            }
          }
        }
    }`;

   const response: LastMonthDTO[] = await fetchFromServer<LastMonthDTO[]>('teamData', data, 'teamsLastMonth');

   return response;
};
