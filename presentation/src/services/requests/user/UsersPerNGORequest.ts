import {fetchFromServer} from '../Fetch';
import {ServerDto} from '../Dto';

export const fetchUsersPerNGO = async (): Promise<ServerDto[]> => {
   const data = `query {
        ngoStats {
          usersNGO {
            name
            count
          }
        }
      }`;

   const response: ServerDto[] = await fetchFromServer<ServerDto[]>('ngoStats', data, 'usersNGO');

   return response;
};
