import { fetchFromServer } from '../Fetch';

export const fetchUsersPerNGO = async (): Promise<any> => {
  const data = `query {
        ngoStats {
          usersNGO {
            name
            count
          }
        }
      }`;

  const response = await fetchFromServer('ngoStats', data, 'usersNGO');

  return response;
};
