import {fetchFromServer} from '../Fetch';

export const fetchTeamSizeData = async (): Promise<any> => {
   const data = `query{
      teamData{
        teamSize{
          value
          count
        }
      }
    }`;

   const response = await fetchFromServer('teamData', data, 'teamSize');

   return response;
};
