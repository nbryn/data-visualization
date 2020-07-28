import { fetchFromServer } from '../Fetch';

export const fetchLoansLastMonth = async (): Promise<any> => {
  const data = `query{
    financeStats{
      loansLastMonth{
          count
          day{
            day
            month
            year
          }
        }     
      }  
}`;

  const response = await fetchFromServer(
    'financeStats',
    data,
    'loansLastMonth'
  );

  return response;
};
