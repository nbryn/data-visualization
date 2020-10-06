import {fetchFromServer} from '../Fetch';
import {LastYearDTO} from '../DTOs';

export const fetchUsersLastYear = async (): Promise<LastYearDTO[]> => {
   const data = `query {
    userStats {
      usersLastYear {
          count
          year
          month
      }
    }
  }`;

   const response: LastYearDTO[] = await fetchFromServer<LastYearDTO[]>(
      'userStats',
      data,
      'usersLastYear'
   );

   return response;
};
