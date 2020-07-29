import { fetchFromServer } from '../Fetch';

export const fetchMeetingData = async (): Promise<any> => {
  const data = `query{
      meetingStats{
        meetingTotal
        meetingsLastMonth{
            count
            day{
              year
              month
              day
            }
        }
        meetingsLastYear{
            year
            month
            count
        }
        meetingsPerGroup {
          name
          count
        }
        sharesPerMeeting {
          name
          count
        }
      }
    }`;

  const response = await fetchFromServer('meetingStats', data);

  return response;
};

export interface MeetingState {
  [key: string]: any;
  meetingsTotal: number;
  meetingsLastWeek: Array<any>;
  meetingsLastMonth: Array<any>;
  meetingsLastYear: Array<any>;
  meetingsPerGroup: Array<any>;
  sharesPerMeeting: Array<any>;
  meetingPerCountry: Array<any>;
  meetingStats: any;
}
