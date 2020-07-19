import { SET_CURRENT_USER } from "../ActionTypes.ts";
import { fetchFromServer } from "../Fetch.ts";
import { setTokenInHeader } from "../../../security/Token";

export const setCurrentUser = () => async dispatch => {
  const data = `query{
        me
      }`;

  setTokenInHeader();

  const response = await fetchFromServer("post", data);

  dispatch({
    type: SET_CURRENT_USER,
    payload: response.data.data
  });

  return response;
};
