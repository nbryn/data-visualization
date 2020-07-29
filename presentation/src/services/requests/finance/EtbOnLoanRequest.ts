import { fetchFromServer } from '../Fetch';

export const fetchEtbOnLoan = async (): Promise<any> => {
    const data = `query{
      financeStats{
          etbOnLoan     
        }  
  }`;

    const response = await fetchFromServer('financeStats', data, 'etbOnLoan');

    return response;
};
