import { fetchFromServer } from '../Fetch';

export const fetchUsersPerCountry = async (): Promise<any> => {
  const data = `query {
        generalCountryStats {
          usersCountry {
            name
            count
          }
        }
      }`;

  const response = await fetchFromServer(
    'generalCountryStats',
    data,
    'usersCountry'
  );

  return response;
};
