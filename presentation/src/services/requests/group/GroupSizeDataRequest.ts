import { fetchFromServer } from '../Fetch';

export const fetchGroupSizeStats = async (): Promise<any> => {
    const data = `query{
      groupStats{
        groupSize{
          value
          count
        }
      }
    }`;

    const response = await fetchFromServer('groupStats', data, 'groupSize');

    return response;
};
