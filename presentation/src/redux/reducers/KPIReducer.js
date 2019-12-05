import {
  USERS_TOTAL,
  USERS_LAST_YEAR,
  GROUP_TOTAL, GROUPS_LAST_MONTH,
  GROUPS_LAST_YEAR, MEETING_TOTAL
} from "../actions/ActionTypes";

export default function(state = {}, action) {
  switch (action.type) {
    case USERS_TOTAL:
      return Object.assign({}, state, {
        userStats: action.payload
      });
    case USERS_LAST_YEAR:
      return Object.assign({}, state, {
        usersLastYear: action.payload
      });
    case GROUP_TOTAL:
      return Object.assign({}, state, {
        groupTotal: action.payload
      });
      case GROUPS_LAST_MONTH:
      return Object.assign({}, state, {
        groupsLastMonth: action.payload
      });
      case GROUPS_LAST_YEAR:
      return Object.assign({}, state, {
        groupsLastYear: action.payload
      });
      case MEETING_TOTAL:
      return Object.assign({}, state, {
        meetingTotal: action.payload
      });
    default:
      return state;
  }
}
