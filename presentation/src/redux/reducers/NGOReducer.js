import { NGO_GROUPS } from "../actions/ActionTypes";

export default function(state = {}, action) {
  switch (action.type) {
    case NGO_GROUPS:
      return Object.assign({}, state, {
        groups: action.payload
      });
    default:
      return state;
  }
}
