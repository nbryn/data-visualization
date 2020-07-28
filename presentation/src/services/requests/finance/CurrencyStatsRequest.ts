import { fetchFromServer } from '../Fetch';

export const fetchCurrencyStats = async (): Promise<any> => {
  const data = `query{
      financeStats{
          currencyStats{
            name
            count
          }    
        }  
  }`;

  const response = await fetchFromServer('financeStats', data, 'currencyStats');

  return response;
};
