import { fetchFromServer } from "../Fetch";
import { setTokenInLocalStorage } from "../../../security/Token";

export const login = (username, password, history) => async dispatch => {
  const data = `mutation signin {
    data:
     signin(input: {
       username: "${username}"
       password: "${password}"
     })  
     }`;

  const response = await fetchFromServer("post", data);



  const error = response.data.data.data.error;

  if (error) {
    return "Wrong Email/Username";
  } else {
    setTokenInLocalStorage(response);

    history.push("/dashboard");
  }

};
