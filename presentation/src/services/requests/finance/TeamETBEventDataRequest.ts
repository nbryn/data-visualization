import {fetchFromServer} from '../Fetch';
import {ServerDTO} from '../DTO';

export const fetchGroupEtbLoan = async (): Promise<ServerDTO[]> => {
   const data = `query{
      financeData{
          teamETBEventData{
              name
              count
          }     
        }  
  }`;

   const response: ServerDTO[] = await fetchFromServer<ServerDTO[]>('financeData', data, 'teamETBEventData');

   return response;
};
