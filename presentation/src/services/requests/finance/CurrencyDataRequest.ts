import {fetchFromServer} from '../Fetch';

export const fetchCurrencyData = async (): Promise<any> => {
   const data = `query{
      financeData{
          currencyData{
            name
            count
          }    
        }  
  }`;

   const response = await fetchFromServer('financeData', data, 'currencyData');

   return response;
};
