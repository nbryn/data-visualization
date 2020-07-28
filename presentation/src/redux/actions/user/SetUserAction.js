import { SET_CURRENT_USER } from "../../reducers/LoginReducer";
import { fetchFromServer } from "../../../services/requests/Fetch.ts";
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
