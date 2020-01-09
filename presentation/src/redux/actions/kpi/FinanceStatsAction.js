import axios from "axios";
import { FINANCE_STATS } from "../ActionTypes";

const url = "/graphql";

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
            day
            month
            year
          }
          count
        }
      }
      loansLastYear{
        data {
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

  let response;

  try {
    response = await axios({
      url,
      method: "post",
      data: {
        query: data
      }
    });

    dispatch({
      type: FINANCE_STATS,
      payload: response.data.data.financeStats
    });
  } catch (err) {
    console.log(err);
  }
};
