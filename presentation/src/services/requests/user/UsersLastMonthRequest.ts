import {fetchFromServer} from '../Fetch';
import {LastMonthDto} from '../Dto';

export const fetchUsersLastMonth = async (): Promise<LastMonthDto[]> => {
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
    const response: LastMonthDto[] = await fetchFromServer<LastMonthDto[]>('userStats', data, 'usersLastMonth');

    return response;
};
