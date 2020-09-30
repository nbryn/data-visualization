import {fetchFromServer} from '../Fetch';

export const fetchDollarEventCount = async (): Promise<number> => {
   const data = `query{
      accountData{
          dollarEventCount     
        }  
  }`;

   const response = await fetchFromServer<number>('accountData', data, 'etbEventCount');

   return response;
};
