// ----- Actions ------- //
export const USERS_TOTAL = "USERS_TOTAL";
export const USERS_STATS = "USERS_STATS";
export const USERS_LAST_MONTH = "USERS_LAST_MONTH";
export const USERS_LAST_YEAR = "USERS_LAST_YEAR";

export default function (state = {}, action: any) {
  switch (action.type) {
    case USERS_TOTAL:
      return Object.assign({}, state, {
        usersTotal: action.payload,
      });
    case USERS_STATS:
      return Object.assign({}, state, {
        userStats: action.payload,
      });
    case USERS_LAST_MONTH:
      return Object.assign({}, state, {
        usersLastMonth: action.payload,
        usersLastWeek: action.payload.usersLastWeek,
      });
    case USERS_LAST_YEAR:
      return Object.assign({}, state, {
        usersLastYear: action.payload,
      });

    default:
      return state;
  }
}
