import { fetchFromServer } from '../Fetch';
import { MeetingViewDto } from './MeetingViewDto';

export const fetchMeetingViewData = async (): Promise<MeetingViewDto> => {
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

    const response: MeetingViewDto = await fetchFromServer<MeetingViewDto>(
        'meetingStats',
        data
    );

    return response;
};
