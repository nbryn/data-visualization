import {fetchFromServer} from '../Fetch';

export const fetchEtbEventCount = async (): Promise<any> => {
   const data = `query{
      financeData{
          etbEventCount     
        }  
  }`;

   const response = await fetchFromServer('financeData', data, 'etbEventCount');

   return response;
};
