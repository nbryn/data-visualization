// ----- Actions ------- //
export const GROUPS_TOTAL = "GROUPS_TOTAL";
export const GROUP_STATS = "GROUPS_STATS";
export const GROUPS_LAST_MONTH = "GROUPS_LAST_MONTH";
export const GROUPS_LAST_YEAR = "GROUPS_LAST_YEAR";

export default function (state = {}, action: any) {
  switch (action.type) {
    case GROUPS_TOTAL:
      return Object.assign({}, state, {
        groupsTotal: action.payload,
      });
    case GROUP_STATS:
      return Object.assign({}, state, {
        groupStats: action.payload,
      });
    case GROUPS_LAST_MONTH:
      return Object.assign({}, state, {
        groupsLastMonth: action.payload,
        //groupsLastWeek: action.payload.groupsLastWeek,
      });
    case GROUPS_LAST_YEAR:
      return Object.assign({}, state, {
        groupsLastYear: action.payload,
      });

    default:
      return state;
  }
}