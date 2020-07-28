import { fetchFromServer } from '../Fetch';

export const fetchGroupEtbLoan = async (): Promise<any> => {
  const data = `query{
      financeStats{
          groupEtbLoan{
              name
              count
          }     
        }  
  }`;

  const response = await fetchFromServer('financeStats', data, 'groupEtbLoan');

  return response;
};
