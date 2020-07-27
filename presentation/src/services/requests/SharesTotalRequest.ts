import { fetchFromServer } from '../../redux/actions/Fetch';

export const fetchTotalShares = async (): Promise<any> => {
  const data = `query{
      financeStats{
        shareStats{
          shareTotal     
        }  
    }
  }`;

  const response = await fetchFromServer('financeStats', data, 'shareStats');

  return response;
};
