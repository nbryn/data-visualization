import {fetchFromServer} from '../Fetch';
import {TeamViewDTO} from './TeamViewDTO';

export const fetchTeamViewData = async (): Promise<TeamViewDTO> => {
   const data = `query{
      teamData{
        teamCount
        teamSize{
          name
          count
        }
        teamsLastMonth{
            count
            day{
              year
              month
              day
            }
        }
        teamsLastYear{
          year
          month
          count
          }
      }
    }`;

   const response: TeamViewDTO = await fetchFromServer<TeamViewDTO>('teamData', data);

   return response;
};
