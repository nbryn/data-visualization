export const GROUPS_TOTAL = 'GROUPS_TOTAL';
export const GROUPS_TODAY = 'GROUPS_TODAY';
export const GROUPS_LAST_MONTH = 'GROUPS_LAST_MONTH';
export const GROUPS_LAST_YEAR = 'GROUPS_LAST_YEAR';
export const UPDATE_GROUP_DATA = 'UPDATE_GROUP_DATA';
export const GROUP_SIZE_STATS = 'GROUP_SIZE_STATS';
export const GROUPS_LAST_MONTH_BAR_CHART = 'GROUPS_LAST_MONTH_BAR_CHART';
export const GROUPS_LAST_YEAR_BAR_CHART = 'GROUPS_LAST_YEAR_BAR_CHART';
export const GROUPS_LAST_MONTH_LINE_CHART = 'GROUPS_LAST_MONTH_LINE_CHART';
export const GROUPS_LAST_YEAR_LINE_CHART = 'GROUPS_LAST_YEAR_LINE_CHART';

export interface GroupAction {
  type: any;
  payload: GroupState;
}

export function updateGroupData(data: GroupState): GroupAction {
  return {
    type: UPDATE_GROUP_DATA,
    payload: data
  };
}

export default function (state = {}, action: GroupAction) {
  switch (action.type) {
    case UPDATE_GROUP_DATA:
      return Object.assign({}, state, {
        groupSizeStats: action.payload.groupSizeStats,
        total: action.payload.total,
        todayCount: action.payload.todayCount,
        todayDate: action.payload.todayDate,
        lastMonthCount: action.payload.lastMonthCount,
        lastYearCount: action.payload.lastYearCount,
        lastMonthBarChartData: action.payload.lastYearBarChartData,
        lastYearBarChartData: action.payload.lastYearBarChartData,
        lastMonthLineChartData: action.payload.lastMonthLineChartData,
        lastYearLineChartData: action.payload.lastYearLineChartData,
        perCountryData: action.payload.perCountryData,
        perNGOData: action.payload.perNGOData
      });

    default:
      return state;
  }
}

export interface GroupState {
  [key: string]: any;
  total: number;
  todayCount: number;
  todayDate: string;
  lastMonthCount: number;
  lastYearCount: number;
  lastMonthBarChartData: Array<any>;
  lastYearBarChartData: Array<any>;
  lastMonthLineChartData: Array<any>;
  lastYearLineChartData: Array<any>;
  groupSizeStats: Array<any>;
  perCountryData: Array<any>;
  perNGOData: Array<any>;
}

export const initialGroupState: GroupState = {
  groupSizeStats: [],
  total: 0,
  todayCount: 0,
  todayDate: '',
  lastMonthCount: 0,
  lastYearCount: 0,
  lastMonthBarChartData: [],
  lastYearBarChartData: [],
  lastMonthLineChartData: [],
  lastYearLineChartData: [],
  perCountryData: [],
  perNGOData: []
};
