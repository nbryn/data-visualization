import { ALL_NGO_GROUPS, NGO_GROUP } from "../actions/ActionTypes";

export default function(state = {}, action) {
  switch (action.type) {
    case ALL_NGO_GROUPS:
      return Object.assign({}, state, {
        groups: action.payload
      });
      case NGO_GROUP:
      return Object.assign({}, state, {
        group: action.payload
      });
    default:
      return state;
  }
}
