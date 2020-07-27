import { fetchFromServer } from '../../redux/actions/Fetch';

export const fetchUsersLastMonth = async (): Promise<any> => {
  const data = `query {
    userStats {
      usersLastMonth {
          count
          day {
            day
            month
            year
        }
      }
    }
  }`;
  const response = await fetchFromServer('userStats', data, 'usersLastMonth');

  return response;
};