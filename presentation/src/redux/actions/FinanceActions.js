import { SHARES_TOTAL, FINANCE_STATS } from "../reducers/FinanceReducer";
import { fetchFromServer } from "./Fetch.ts";

export const fetchFinanceStats = () => async (dispatch) => {
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
    payload: response,
  });
};

export const fetchTotalShares = () => async (dispatch) => {
  const data = `query{
    financeStats{
      shareStats{
        shareTotal     
      }  
  }
}`;

  const response = await fetchFromServer("financeStats", data);

  dispatch({
    type: SHARES_TOTAL,
    payload: response.shareStats.shareTotal,
  });
};
