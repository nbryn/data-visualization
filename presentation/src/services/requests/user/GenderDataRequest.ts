import {fetchFromServer} from '../Fetch';
import {ServerDTO} from '../DTOs';

export const fetchUserGenderData = async (): Promise<ServerDTO[]> => {
   const data = `query {
      userStats{
        userGenderStats{
          name
          count
        }
      }
    }`;

   const response: ServerDTO[] = await fetchFromServer<ServerDTO[]>('userStats', data, 'userGenderStats');

   return response;
};
