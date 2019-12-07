import { USERS_STATS } from "../ActionTypes";
import axios from "axios";

import { setTokenInHeader } from "../../../security/Token";

const url = "http://localhost:4000/graphql";

export const fetchUserStats = () => async dispatch => {
  const data = `query {
        userStats   
        }`;

  setTokenInHeader();

  let response;

  try {
    response = await axios({
      url,
      method: "post",
      data: {
        query: data
      }
    });

    if (response.data.errors) {
      return response.data.errors[0].extensions.code;
    } else {
      dispatch({
        type: USERS_STATS,
        payload: response.data.data.userStats
      });
    }

    return response.data.data.userStats;
  } catch (err) {
    console.log(err);
  }
};
