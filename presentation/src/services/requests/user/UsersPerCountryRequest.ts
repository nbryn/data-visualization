import {fetchFromServer} from '../Fetch';
import {ServerDto} from '../Dto';

export const fetchUsersPerCountry = async (): Promise<ServerDto[]> => {
    const data = `query {
        generalCountryStats {
          usersCountry {
            name
            count
          }
        }
      }`;

    const response: ServerDto[] = await fetchFromServer<ServerDto[]>('generalCountryStats', data, 'usersCountry');

    return response;
};
