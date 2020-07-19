import { FINANCE_STATS } from "../ActionTypes.ts";
import { fetchFromServer } from "../Fetch.ts";

export const fetchFinanceStats = () => async dispatch => {
  const data = `query{
    financeStats{
      currencyStats{
        numberOfCurrencies
        currency{
          name
          count
        }        
      }
      loanTotal
      loansLastMonth{
          day{
            year
            month
            day
          }
          count
      }
      loansLastYear{
          year
          month
          count
      }
      shareStats{
        shareTotal
        groupShares{
          name
          count
        }
        mostShares{
          name
          count
        }
        
      }
      etbStats{
        etbOnLoan
        groupLoan{
          name
          count
        
      }
    }
  }
}`;

  const response = await fetchFromServer("financeStats", data);

  dispatch({
    type: FINANCE_STATS,
    payload: response
  });
};
