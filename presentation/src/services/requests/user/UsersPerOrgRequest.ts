import {fetchFromServer} from '../Fetch';
import {ServerDTO} from '../DTOs';

export const fetchUsersPerOrg = async (): Promise<ServerDTO[]> => {
   const data = `query {
        orgData {
          usersPerOrg {
            name
            count
          }
        }
      }`;

   const response: ServerDTO[] = await fetchFromServer<ServerDTO[]>('orgData', data, 'usersPerOrg');

   return response;
};
