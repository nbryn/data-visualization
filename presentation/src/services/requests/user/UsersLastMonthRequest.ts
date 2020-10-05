import {fetchFromServer} from '../Fetch';
import {LastMonthDTO} from '../DTOs';

export const fetchUsersLastMonth = async (): Promise<LastMonthDTO[]> => {
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
   const response: LastMonthDTO[] = await fetchFromServer<LastMonthDTO[]>(
      'userStats',
      data,
      'usersLastMonth'
   );

   return response;
};
