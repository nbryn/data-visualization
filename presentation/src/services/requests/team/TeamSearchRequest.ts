import {fetchFromServer} from '../Fetch';
import {TeamDTO} from './TeamDTO';

export const fetchDataForTeam = async (team: string): Promise<TeamDTO> => {
   const data = `query {
    teamSearch(input: { team: ${team} }) {
      ... on Team {
        regDate
        currency
        lastMatch
        balance
        matchesTotal
        perMeeting
        events
        meetings
        owner {
          firstName
          lastName
        }
        admin {
          firstName
          lastName
        }
        members
      }
  
      ... on Error {
        errorMessage
      }
    }
  }`;

   const response: TeamDTO = await fetchFromServer<TeamDTO>('teamSearch', data);

   return response;
};
