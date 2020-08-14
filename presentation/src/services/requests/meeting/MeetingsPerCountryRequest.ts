import {fetchFromServer} from '../Fetch';

export const fetchMeetingsPerCountry = async (): Promise<any> => {
    const data = `query {
        generalCountryStats {
          meetingsCountry {
            name
            count
          }
        }
      }`;

    const response = await fetchFromServer('generalCountryStats', data, 'meetingsCountry');

    return response;
};
