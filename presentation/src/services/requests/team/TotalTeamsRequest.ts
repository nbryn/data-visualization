import {fetchFromServer} from '../Fetch';

export const fetchTotalTeams = async (): Promise<number> => {
   const data = `query{
      teamData{
        teamCount
      }
    }`;

   const response = await fetchFromServer<number>('teamData', data, 'teamCount');

   return response;
};
