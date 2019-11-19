import { LOGIN } from "../ActionTypes";
import axios from "axios";

import { setTokenOnLogin } from "../../../security/Token";

const url =
  "https://anpjwd4bz4.execute-api.eu-central-1.amazonaws.com/dev/graphql";

export const login = (username, password, history) => async dispatch => {
  const data = `mutation {
        signin(input: {
          channel: ANDROID
          username: "${username}"
          password: "${password}"
        }) {
          ... on ValidationError {
            result {
              field
              errors
            }
          }
    
          ... on Login {
            token
            refreshToken
            deviceId
            user {
              email
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

    // Flag for error in DB?
    if (response.data.data.signin.result) {
      return response.data.data.signin.result[0].errors;
    } else {
      setTokenOnLogin(response);

      history.push("/dashboard");
    }

    // Need better handling of network errors here
  } catch (err) {
    console.log(err);
    return "Connection problem";
  }
};
