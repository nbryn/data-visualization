import {fetchFromServer} from '../Fetch';

export const fetchMostShares = async (): Promise<any> => {
   const data = `query{
      financeStats{
          mostShares    
        }  
  }`;

   const response = await fetchFromServer('financeStats', data, 'mostShares');

   return response;
};
