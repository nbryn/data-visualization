import {fetchFromServer} from '../Fetch';

export const fetchTotalMeetings = async (): Promise<number> => {
   const data = `query{
      financeData{
          meetingTotal     
        }  
  }`;

   const response = await fetchFromServer<number>('financeData', data, 'meetingTotal');

   return response;
};
