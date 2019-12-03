import { SET_CURRENT_USER } from "../actions/ActionTypes";

export default function(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return Object.assign({}, state, {
        currentUser: action.payload
      });
    default:
      return state;
  }
}