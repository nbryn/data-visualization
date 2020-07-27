import {
  GROUPS_LAST_MONTH_BAR_CHART,
  GROUPS_LAST_YEAR_BAR_CHART,
  GROUPS_LAST_MONTH_LINE_CHART,
  GROUPS_LAST_YEAR_LINE_CHART,
  GROUP_STATS,
  GROUP_SIZE_STATS,
  GROUPS_TOTAL,
  GROUPS_LAST_MONTH,
  GROUPS_LAST_YEAR
} from './GroupTypes';

export default function (state = {}, action: any) {
  switch (action.type) {
    case GROUPS_TOTAL:
      return Object.assign({}, state, {
        groupsTotal: action.payload
      });
    case GROUP_STATS:
      return Object.assign({}, state, {
        groupStats: action.payload
      });
    case GROUPS_LAST_MONTH_BAR_CHART:
      return Object.assign({}, state, {
        groupsLastMonthBarChart: action.payload
        //groupsLastWeek: action.payload.groupsLastWeek,
      });
    case GROUPS_LAST_YEAR_BAR_CHART:
      return Object.assign({}, state, {
        groupsLastYearBarChart: action.payload
      });
      case GROUPS_LAST_MONTH_LINE_CHART:
      return Object.assign({}, state, {
        groupsLastMonthLineChart: action.payload
        //groupsLastWeek: action.payload.groupsLastWeek,
      });
    case GROUPS_LAST_YEAR_LINE_CHART:
      return Object.assign({}, state, {
        groupsLastYearLineChart: action.payload
      });
      case GROUPS_LAST_MONTH:
      return Object.assign({}, state, {
        groupsLastMonth: action.payload
      });
      case GROUPS_LAST_YEAR:
      return Object.assign({}, state, {
        groupsLastYear: action.payload
      });
      case GROUP_SIZE_STATS:
        return Object.assign({}, state, {
          groupSizeStats: action.payload
        });

    default:
      return state;
  }
}
