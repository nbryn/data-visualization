import { fetchFromServer } from '../Fetch';

export const fetchGroupsPerCountry = async (): Promise<any> => {
  const data = `query {
        generalCountryStats {
          groupsCountry {
            name
            count
          }
        }
      }`;

  const response = await fetchFromServer('generalCountryStats', data, 'groupsCountry');

  return response;
};
