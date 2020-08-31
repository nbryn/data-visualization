import {fetchFromServer} from '../Fetch';

export const fetchLoansLastYear = async (): Promise<any> => {
   const data = `query{
      financeStats{
        loansLastYear{
            count
            month
            year
          }     
        }  
  }`;

   const response = await fetchFromServer('financeStats', data, 'loansLastYear');

   return response;
};
