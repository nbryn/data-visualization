import {fetchFromServer} from '../Fetch';
import {ServerDTO} from '../DTOs';

export const fetchMatchesPerCountry = async (): Promise<ServerDTO[]> => {
   const data = `query {
        generalCountryData {
          matchesCountry {
            name
            count
          }
        }
      }`;

   const response: ServerDTO[] = await fetchFromServer<ServerDTO[]>('generalCountryData', data, 'matchesCountry');

   return response;
};
