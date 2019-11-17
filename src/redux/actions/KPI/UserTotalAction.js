import { USERS_TOTAL } from "../ActionTypes";
import axios from "axios";

import {setTokenOnApiRequest} from "../../../security/Token";

const url =
  "https://anpjwd4bz4.execute-api.eu-central-1.amazonaws.com/dev/graphql";

export const getUsersTotal = () => async dispatch => {
  const data = `query {
        userStats{
          numberOfUsers
          signups { count }    
        }
        }`;

  setTokenOnApiRequest();

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
        type: USERS_TOTAL,
        payload: response.data.data.userStats
      });
    }

    console.log(response.data.data.userStats.numberOfUsers);

    return response.data.data.userStats;
  } catch (err) {
    console.log(err);
  }
};
