import axios from "axios";

import { MONEY_STATS } from "../ActionTypes";

const url = "http://localhost:4000/graphql";

export const fetchMoneyStats = () => async dispatch => {
  const data = `query{
    moneyStats{
      moneyTotal
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
      type: MONEY_STATS,
      payload: response.data.data.moneyStats
    });
  } catch (err) {
    console.log(err);
  }
};
