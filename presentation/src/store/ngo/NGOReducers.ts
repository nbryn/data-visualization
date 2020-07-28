import {
  GROUP_DATA,
  GROUPS_PER_NGO,
  USERS_PER_NGO,
  NGO_GROUPS
} from './NGOTypes';

export default function (state = {}, action: any) {
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
        groupsPerNGO: action.payload
      });
    case USERS_PER_NGO:
      return Object.assign({}, state, {
        usersPerNGO: action.payload
      });
    default:
      return state;
  }
}
