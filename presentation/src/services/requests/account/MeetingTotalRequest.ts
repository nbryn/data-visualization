import {fetchFromServer} from '../Fetch';

export const fetchTotalMeetings = async (): Promise<number> => {
   const data = `query{
      accountData{
          meetingTotal     
        }  
  }`;

   const response = await fetchFromServer<number>('accountData', data, 'meetingTotal');

   return response;
};
