import {fetchFromServer} from '../Fetch';
import {FinanceViewDto} from './FinanceViewDto';

export const fetchFinanceData = async (): Promise<FinanceViewDto> => {
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

    const response: FinanceViewDto = await fetchFromServer<FinanceViewDto>('financeStats', data);

    return response;
};
