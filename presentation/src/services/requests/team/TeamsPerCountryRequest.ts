import {fetchFromServer} from '../Fetch';
import {ServerDTO} from '../DTOs';

export const fetchTeamsPerCountry = async (): Promise<ServerDTO[]> => {
   const data = `query {
        generalCountryData {
          teamsCountry {
            name
            count
          }
        }
      }`;

   const response: ServerDTO[] = await fetchFromServer<ServerDTO[]>('generalCountryData', data, 'teamsCountry');

   return response;
};
