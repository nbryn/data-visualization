import {fetchFromServer} from '../Fetch';

export const fetchTotalUsers = async (): Promise<any> => {
   const data = `query {
    userStats {
      userCount
    }
  }`;
   const response = await fetchFromServer('userStats', data, 'userCount');

   return response;
};
