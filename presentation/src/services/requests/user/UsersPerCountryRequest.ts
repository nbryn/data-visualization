import {fetchFromServer} from '../Fetch';
import {ServerDTO} from '../DTOs';

export const fetchUsersPerCountry = async (): Promise<ServerDTO[]> => {
   const data = `query {
        generalCountryData {
          usersCountry {
            name
            count
          }
        }
      }`;

   const response: ServerDTO[] = await fetchFromServer<ServerDTO[]>('generalCountryData', data, 'usersCountry');

   return response;
};
