import { NGO_GROUPS, GROUP_DATA, GROUPS_PER_NGO } from "../actions/ActionTypes";

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
      case GROUPS_PER_NGO:
      return Object.assign({}, state, {
        groupsNGO: action.payload.groupsNGO
      });
    default:
      return state;
  }
}
