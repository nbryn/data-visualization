import {fetchFromServer} from '../Fetch';

export const fetchTotalUsers = async (): Promise<number> => {
   const data = `query {
    userStats {
      userCount
    }
  }`;
   const response = await fetchFromServer<number>('userStats', data, 'userCount');

   return response;
};
