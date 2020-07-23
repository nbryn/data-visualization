import { SET_CURRENT_USER } from "../../reducers/LoginReducer";
import { fetchFromServer } from "../Fetch.ts";
import { setTokenInLocalStorage } from "../../../security/Token";

export const login = (username, password, history) => async (dispatch) => {
  const data = `mutation signin {
     signin(input: {
       username: "${username}"
       password: "${password}"
     })  
     }`;

  const response = await fetchFromServer("signin", data);
  
  const error = response.error;

  if (error) {
    return "Wrong Email/Username";
  } else {
    setTokenInLocalStorage(response);

    dispatch({
      type: SET_CURRENT_USER,
      payload: response,
    });

    history.push("/dashboard");
  }
};
