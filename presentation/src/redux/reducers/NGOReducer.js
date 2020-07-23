export const NGO_GROUPS = "NGO_GROUPS";
export const GROUPS_PER_NGO = "GROUPS_PER_NGO";
export const GROUP_DATA = "GROUP_DATA"

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
        groupsNGO: action.payload.groupsNGO,
        usersNGO: action.payload.usersNGO
      });
    default:
      return state;
  }
}
