import {fetchFromServer} from '../Fetch';

export const fetchMostMeetings = async (): Promise<number> => {
   const data = `query{
      financeData{
          teamWithMostMeetings    
        }  
  }`;

   const response = await fetchFromServer<number>('financeData', data, 'teamWithMostMeetings');

   return response;
};
