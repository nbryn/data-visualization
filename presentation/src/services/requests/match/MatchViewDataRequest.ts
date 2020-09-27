import {fetchFromServer} from '../Fetch';
import {MeetingViewDTO} from './MatchViewDTO';

export const fetchMatchViewData = async (): Promise<MeetingViewDTO> => {
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
        meetingsPerEvent {
          name
          count
        }
      }
    }`;

   const response: MeetingViewDTO = await fetchFromServer<MeetingViewDTO>('matchData', data);

   return response;
};
