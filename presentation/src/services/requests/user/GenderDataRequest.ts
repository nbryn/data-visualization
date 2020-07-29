import { fetchFromServer } from '../Fetch';

export const fetchUserGenderStats = async (): Promise<any> => {
  const data = `query {
      userStats{
        userGenderStats{
          value
          count
        }
      }
    }`;

  const response = await fetchFromServer('userStats', data, 'userGenderStats');

  return response;
};
