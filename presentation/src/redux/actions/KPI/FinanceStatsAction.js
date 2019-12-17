import axios from "axios";
import { FINANCE_STATS } from "../ActionTypes";

const url = "http://localhost:4000/graphql";

export const fetchFinanceStats = () => async dispatch => {
  const data = `query{
    financeStats{
      currencyTotal
      currencyStats{
        name
        count
      }
      shareTotal
      mostShares{
        groupName
        count
      }
      shareStats{
        name
        count
      }
      loanTotal
      loansLastYear{
        data{
          month
          count
        }
      }
      loansLastMonth{
        data{
          count
          day{
            day
          month
          year
          }
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
