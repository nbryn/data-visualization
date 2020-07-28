import { fetchFromServer } from '../Fetch';

export const fetchTotalLoans = async (): Promise<any> => {
  const data = `query{
      financeStats{
          loanTotal     
        }  
  }`;

  const response = await fetchFromServer('financeStats', data, 'loanTotal');

  return response;
};
