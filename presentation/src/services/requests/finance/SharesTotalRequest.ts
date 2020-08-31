import {fetchFromServer} from '../Fetch';

export const fetchTotalShares = async (): Promise<any> => {
   const data = `query{
      financeStats{
          shareTotal     
        }  
  }`;

   const response = await fetchFromServer('financeStats', data, 'shareTotal');

   return response;
};
