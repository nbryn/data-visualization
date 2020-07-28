import { fetchFromServer } from '../Fetch';

export const fetchFinanceData = async (): Promise<any> => {
  const data = `query {
        financeStats {
          numberOfCurrencies
          currencyStats {
            name
            count
          }
          loanTotal
          loansLastMonth {
            count
            day {
              day
              month
              year
            }
          }
          loansLastYear {
            count
            month
            year
          }
          shareTotal
          mostSharesData {
            name
            count
          }
          mostShares
          shareStats {
            name
            count
          }
          etbOnLoan
          groupEtbLoan {
            name
            count
          }
        }
      }`;

  const response = await fetchFromServer('financeStats', data);

  return response;
};
