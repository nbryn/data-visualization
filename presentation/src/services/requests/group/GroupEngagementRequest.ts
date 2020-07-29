import { fetchFromServer } from '../Fetch';

export const fetchGroupEngagementData = async (): Promise<any> => {
    const data = `query{
        groupEngagement{
          groupsActive
          groupMeetingFrequency{
            value
            count
          }
      
        }
      }`;

    const response = await fetchFromServer('groupEngagement', data);

    return response;
};
