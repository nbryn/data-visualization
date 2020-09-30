import {fetchFromServer} from '../Fetch';
import {ServerDTO} from '../DTO';

export const fetchCurrencyData = async (): Promise<ServerDTO[]> => {
   const data = `query{
      accountata{
          currencyData{
            name
            count
          }    
        }  
  }`;

   const response = await fetchFromServer<ServerDTO[]>('accountata', data, 'currencyData');

   return response;
};
