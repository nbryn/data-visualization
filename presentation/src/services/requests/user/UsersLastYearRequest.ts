import { fetchFromServer } from '../Fetch';

export const fetchUsersLastYear = async (): Promise<any> => {
  const data = `query {
    userStats {
      usersLastYear {
          count
          year
          month
      }
    }
  }`;

  const response = await fetchFromServer('userStats', data, 'usersLastYear');

  return response;
};
