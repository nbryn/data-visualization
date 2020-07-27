import { fetchFromServer } from '../../redux/actions/Fetch';

export const fetchTotalGroups = async (): Promise<any> => {
  const data = `query{
      groupStats{
        groupTotal
      }
    }`;

  const response = await fetchFromServer('groupStats', data, 'groupTotal');

  return response;
};
