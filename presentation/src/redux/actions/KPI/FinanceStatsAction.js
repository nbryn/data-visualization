import axios from "axios";
import { FINANCE_STATS } from "../ActionTypes";

const url = "http://localhost:4000/graphql";

export const fetchFinanceStats = () => async dispatch => {
  const data = `query{
    financeStats{
      currencyTotal
      currencyStats{
        name
        totalAmount
      }
      shareTotal
      mostShares{
        groupName
        amount
      }
      shareStats{
        groupName
        totalAmount
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
