import {fetchFromServer} from '../Fetch';
import {ServerDTO} from '../DTO';

export const fetchEventsPerTeam = async (): Promise<ServerDTO[]> => {
   const data = `query{
      financeData{
          meetingData{
            name
            count
          }     
        }  
  }`;

   const response: ServerDTO[] = await fetchFromServer<ServerDTO[]>('financeData', data, 'meetingData');

   return response;
};
