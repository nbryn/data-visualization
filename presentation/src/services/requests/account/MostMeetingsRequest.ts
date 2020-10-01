import {fetchFromServer} from '../Fetch';

export const fetchMostMeetings = async (): Promise<number> => {
   const data = `query{
      accountData{
          teamWithMostMeetings    
        }  
  }`;

   const response = await fetchFromServer<number>('accountData', data, 'teamWithMostMeetings');

   return response;
};
