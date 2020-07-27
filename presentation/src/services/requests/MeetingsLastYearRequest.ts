import { fetchFromServer } from '../../redux/actions/Fetch';

export const fetchMeetingsLastYear = async (): Promise<any> => {
  const data = `query{
      meetingStats{
        meetingsLastYear{
            year
            month
            count
        }   
      }
    }`;

  const response = await fetchFromServer('meetingStats', data, 'meetingsLastYear');

  return response;
};
