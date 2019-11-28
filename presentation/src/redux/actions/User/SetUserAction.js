import { SET_CURRENT_USER } from "../ActionTypes";
import axios from "axios";

import { setTokenInHeader } from "../../../security/Token";

const url =
"http://localhost:4000/graphql";

export const setCurrentUser = () => async dispatch => {
  const data = `query{
        me
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


    // Flag for error in DB?

    console.log(response);
    dispatch({
      type: SET_CURRENT_USER,
      payload: response.data.data
    });

    return response;

    // Need better handling of network errors here
  } catch (err) {
    console.log(err);
    return "Connection problem";
  }
};
