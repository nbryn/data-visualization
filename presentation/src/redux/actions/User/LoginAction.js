import axios from "axios";

import { setTokenInLocalStorage } from "../../../security/Token";

const url =
  "https://localhost:3001/graphql";

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
    const error = response.data.data.signin.result;
    if (error) {
      if (error[0].errors[0] === "NO_SEARCH" || error[0].errors[0] === "TO_SHORT") {
      return "Wrong Email/Username";
      } else {
        return "Wrong Password"
      }
    } else {
      setTokenInLocalStorage(response);

      history.push("/dashboard");
    }

    // Need better handling of network errors here
  } catch (err) {
    console.log(err);
    return "Connection problem";
  }
};
