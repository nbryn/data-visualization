import {
  KEY_STATS,
  ENGAGEMENT_STATS,
  FINANCE_STATS,
  GROUP_STATS,
  MEETING_STATS,
  USERS_STATS
} from "../actions/ActionTypes";

export default function(state = {}, action) {
  switch (action.type) {
    case KEY_STATS:
      return Object.assign({}, state, {
        keyStats: action.payload
      });
    case ENGAGEMENT_STATS:
      return Object.assign({}, state, {
        engagementStats: action.payload
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

    default:
      return state;
  }
}
