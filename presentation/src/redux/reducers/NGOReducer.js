import { NGO_GROUPS, GROUP_DATA } from "../actions/ActionTypes";

export default function(state = {}, action) {
  switch (action.type) {
    case NGO_GROUPS:
      return Object.assign({}, state, {
        groups: action.payload
      });
    case GROUP_DATA:
      return Object.assign({}, state, {
        groupData: action.payload
      });
    default:
      return state;
  }
}
