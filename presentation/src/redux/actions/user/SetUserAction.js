import { SET_CURRENT_USER } from "../ActionTypes";
import { fetchFromServer } from "../Fetch";
import { setTokenInHeader } from "../../../security/Token";

export const setCurrentUser = () => async dispatch => {
  const data = `query{
        me
      }`;

  setTokenInHeader();

  const response = await fetchFromServer("post", data);

  console.log(response);

  dispatch({
    type: SET_CURRENT_USER,
    payload: response.data.data
  });

  return response;
};
