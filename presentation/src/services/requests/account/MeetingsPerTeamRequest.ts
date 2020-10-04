import {fetchFromServer} from '../Fetch';
import {ServerDTO} from '../DTOs';

export const fetchMeetingsPerTeam = async (): Promise<ServerDTO[]> => {
   const data = `query{
      accountData{
          meetingData{
            name
            count
          }     
        }  
  }`;

   const response: ServerDTO[] = await fetchFromServer<ServerDTO[]>('accountData', data, 'mostMeetingData');

   return response;
};
