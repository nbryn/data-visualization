import { FINANCE_STATS } from "../ActionTypes";
import { fetchFromServer } from "../Fetch";

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
        data{
          day{
            year
            month
            day
          }
          count
        }
      }
      loansLastYear{
        data{
          year
          month
          count
        }
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

  const response = await fetchFromServer("post", data);

  dispatch({
    type: FINANCE_STATS,
    payload: response.data.data.financeStats
  });
};
