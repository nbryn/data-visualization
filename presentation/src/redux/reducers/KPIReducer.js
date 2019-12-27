import {
  KEY_STATS,
  FINANCE_STATS,
  GROUP_STATS,
  MEETING_STATS,
  USERS_STATS,
  USERS_LAST_YEAR,
  USERS_GENDER
} from "../actions/ActionTypes";

export default function(state = {}, action) {
  switch (action.type) {
    case KEY_STATS:
      return Object.assign({}, state, {
        keyStats: action.payload
      });
    case FINANCE_STATS:
      return Object.assign({}, state, {
        financeStats: action.payload
      });
    case GROUP_STATS:
      return Object.assign({}, state, {
        groupStats: action.payload
      });
    case MEETING_STATS:
      return Object.assign({}, state, {
        meetingStats: action.payload
      });

    case USERS_STATS:
      return Object.assign({}, state, {
        userStats: action.payload
      });
    case USERS_LAST_YEAR:
      return Object.assign({}, state, {
        usersLastYear: action.payload
      });
    case USERS_GENDER:
      return Object.assign({}, state, {
        userGender: action.payload
      });

    default:
      return state;
  }
}
