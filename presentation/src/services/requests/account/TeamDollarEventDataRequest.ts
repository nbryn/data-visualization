import {fetchFromServer} from '../Fetch';
import {ServerDTO} from '../DTO';

export const fetchDollarEventData = async (): Promise<ServerDTO[]> => {
   const data = `query{
      accountData{
          teamETBEventData{
              name
              count
          }     
        }  
  }`;

   const response: ServerDTO[] = await fetchFromServer<ServerDTO[]>('accountData', data, 'teamDollarEventData');

   return response;
};
