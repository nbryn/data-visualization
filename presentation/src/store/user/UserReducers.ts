import {
  USER_GENDER_STATS,
  USERS_TOTAL,
  USER_STATS,
  USERS_LAST_MONTH,
  USERS_LAST_YEAR,
  CHARTJS_USERS_LAST_MONTH,
  CHARTJS_USERS_LAST_YEAR
} from './UserTypes';

export default function (state = {}, action: any) {
  switch (action.type) {
    case USER_GENDER_STATS:
      return Object.assign({}, state, {
        genderStats: action.payload
      });
    case USERS_TOTAL:
      return Object.assign({}, state, {
        usersTotal: action.payload
      });
    case USER_STATS:
      return Object.assign({}, state, {
        userStats: action.payload
      });
    case USERS_LAST_MONTH:
      return Object.assign({}, state, {
        usersLastMonth: action.payload
      });
    case USERS_LAST_YEAR:
      return Object.assign({}, state, {
        usersLastYear: action.payload
      });
    case CHARTJS_USERS_LAST_MONTH:
      return Object.assign({}, state, {
        usersLastWeek: action.payload.usersLastWeek,
        chartjsUsersLastMonth: action.payload
      });
    case CHARTJS_USERS_LAST_YEAR:
      return Object.assign({}, state, {
        chartjsUsersLastYear: action.payload
      });

    default:
      return state;
  }
}