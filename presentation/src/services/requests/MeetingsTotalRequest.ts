import { fetchFromServer } from '../../redux/actions/Fetch';

export const fetchTotalMeetings = async (): Promise<any> => {
  const data = `query{
      meetingStats{
        meetingTotal
      }
    }`;
  const response = fetchFromServer('meetingStats', data, 'meetingTotal');

  return response;
};
