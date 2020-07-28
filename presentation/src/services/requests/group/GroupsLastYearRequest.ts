import { fetchFromServer } from '../Fetch';

export const fetchGroupsLastYear = async (): Promise<any> => {
  const data = `query{
      groupStats{
        groupsLastYear{
          year
          month
          count
          }
      }
    }`;

  const response = await fetchFromServer('groupStats', data, 'groupsLastYear');

  return response;
};
