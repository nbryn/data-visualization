import {fetchFromServer} from '../Fetch';

export const fetchTotalGroups = async (): Promise<any> => {
    const data = `query{
      groupStats{
        groupTotal
      }
    }`;

    const response = await fetchFromServer('groupStats', data, 'groupTotal');

    return response;
};
