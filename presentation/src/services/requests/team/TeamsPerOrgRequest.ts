import {fetchFromServer} from '../Fetch';
import {ServerDTO} from '../DTOs';

export const fetchTeamsPerOrg = async (): Promise<ServerDTO[]> => {
   const data = `query {
        orgData {
          teamsPerOrg {
            name
            count
          }
        }
      }`;

   const response: ServerDTO[] = await fetchFromServer<ServerDTO[]>('orgData', data, 'teamsPerOrg');

   return response;
};
