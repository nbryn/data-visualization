import {fetchFromServer} from '../Fetch';

export const fetchTotalMatches = async (): Promise<number> => {
   const data = `query{
      matchData {
        matchTotal
      }
    }`;
   const response = fetchFromServer<number>('matchData', data, 'matchTotal');

   return response;
};
