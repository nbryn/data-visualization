import { fetchFromServer } from '../Fetch';
import {LastYearDto} from '../Dto'

export const fetchUsersLastYear = async (): Promise<LastYearDto[]> => {
    const data = `query {
    userStats {
      usersLastYear {
          count
          year
          month
      }
    }
  }`;

    const response: LastYearDto[] = await fetchFromServer<LastYearDto[]>('userStats', data, 'usersLastYear');

    return response;
};
