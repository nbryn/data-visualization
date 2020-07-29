import { fetchFromServer } from '../Fetch';

export const fetchActiveUserData = async (): Promise<any> => {
    const data = `query{
        userStats{
          usersActive 
        }
      }`;

    const response = await fetchFromServer('userStats', data, 'usersActive');

    return response;
};
