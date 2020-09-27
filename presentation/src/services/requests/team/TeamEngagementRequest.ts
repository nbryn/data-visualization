import {fetchFromServer} from '../Fetch';

export const fetchTeamEngagementData = async (): Promise<any> => {
   const data = `query{
        teamEngagement{
          teamsActive
          teamMatchFrequency{
            value
            count
          }
      
        }
      }`;

   const response = await fetchFromServer('teamEngagement', data);

   return response;
};
