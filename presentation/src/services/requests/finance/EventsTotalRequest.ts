import {fetchFromServer} from '../Fetch';

export const fetchTotalEvents = async (): Promise<number> => {
   const data = `query{
      financeData{
          eventTotal     
        }  
  }`;

   const response = await fetchFromServer<number>('financeData', data, 'eventTotal');

   return response;
};
