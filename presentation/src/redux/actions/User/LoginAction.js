import axios from "axios";

import { setTokenInLocalStorage } from "../../../security/Token";

const url = "/graphql";

export const login = (username, password, history) => async dispatch => {
  const data = `mutation signin {
    data:
     signin(input: {
       username: "${username}"
       password: "${password}"
     })  
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

    const error = response.data.data.data.error;

    if (error) {
      return "Wrong Email/Username";
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
