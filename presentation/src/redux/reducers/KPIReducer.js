import {
  USERS_STATS,
  USERS_LAST_YEAR,
  GROUP_STATS,
  MEETING_STATS
} from "../actions/ActionTypes";

export default function(state = {}, action) {
  switch (action.type) {
    case USERS_STATS:
      return Object.assign({}, state, {
        userStats: action.payload
      });
    case USERS_LAST_YEAR:
      return Object.assign({}, state, {
        usersLastYear: action.payload
      });
    case GROUP_STATS:
      return Object.assign({}, state, {
        groupStats: action.payload
      });
    case MEETING_STATS:
      return Object.assign({}, state, {
        meetingStats: action.payload
      });
    default:
      return state;
  }
}
