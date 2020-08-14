import {fetchFromServer} from '../Fetch';

export const fetchSharesPerGroup = async (): Promise<any> => {
    const data = `query{
      financeStats{
          shareStats{
            name
            count
          }     
        }  
  }`;

    const response = await fetchFromServer('financeStats', data, 'shareStats');

    return response;
};
