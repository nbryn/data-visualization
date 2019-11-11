import { LOGIN } from "../actions/ActionTypes";

export default function(state = {}, action) {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        user: action.payload
      });
      default:
      return state;
  }
}
