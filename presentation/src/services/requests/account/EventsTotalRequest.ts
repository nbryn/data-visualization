import {fetchFromServer} from '../Fetch';

export const fetchTotalEvents = async (): Promise<number> => {
   const data = `query{
      accountData{
          eventTotal     
        }  
  }`;

   const response = await fetchFromServer<number>('accountData', data, 'eventTotal');

   return response;
};
