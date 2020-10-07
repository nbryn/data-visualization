import {fetchFromServer} from '../Fetch';
import {TeamDTO} from './TeamDTO';

export const fetchTeamsByOrg = async (org: string): Promise<TeamDTO[]> => {
   const data = `query{
        orgTeamData{
          teamData(org: ${org}){
            name
            regDate   
            currency
            lastMatch           
            balance
            matchesTotal
            perMeeting
            events
            meetings
            owner{
              firstName
              lastName
            }
            coach{
              firstName
              lastName
            }
            players                      
      }
      }
      }`;

   const response: TeamDTO[] = await fetchFromServer<TeamDTO[]>('orgTeamData', data, 'teamData');

   return response;
};
