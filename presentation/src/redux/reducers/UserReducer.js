import { SET_CURRENT_USER } from "../actions/ActionTypes.ts";

export default function (state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return Object.assign({}, state, {
        currentUser: action.payload.data.user,
        token: action.payload.data.token,
      });
    default:
      return state;
  }
}
