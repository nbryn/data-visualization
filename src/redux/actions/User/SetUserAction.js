import { SET_USER } from "../ActionTypes";
import axios from "axios";

import { setTokenOnApiRequest } from "../../../security/Token";

const url =
  "https://anpjwd4bz4.execute-api.eu-central-1.amazonaws.com/dev/graphql";

export const setUser = () => async dispatch => {
  const data = `query{
        me{
          id
          updatedAt
          email
          phoneCode
          phoneNumber
          username
          firstName
          lastName
          image
          gender
          active
          verified
          language
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


    // Flag for error in DB?

    console.log(response.data.data.me);
    dispatch({
      type: SET_USER,
      payload: response.data.data.me
    });

    return response;

    // Need better handling of network errors here
  } catch (err) {
    console.log(err);
    return "Connection problem";
  }
};
