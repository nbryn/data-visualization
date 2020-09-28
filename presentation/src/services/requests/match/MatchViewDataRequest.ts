import {fetchFromServer} from '../Fetch';
import {MatchViewDTO} from './MatchViewDTO';

export const fetchMatchViewData = async (): Promise<MatchViewDTO> => {
   const data = `query{
      matchData {
        matchTotal
        matchesLastMonth{
            count
            day{
              year
              month
              day
            }
        }
        matchesLastYear{
            year
            month
            count
        }
        matchesPerTeam {
          name
          count
        }
        meetingsPerMatch {
          name
          count
        }
      }
    }`;

   const response: MatchViewDTO = await fetchFromServer<MatchViewDTO>('matchData', data);

   return response;
};
