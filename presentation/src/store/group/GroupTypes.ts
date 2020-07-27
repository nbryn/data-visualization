export const GROUPS_TOTAL = 'GROUPS_TOTAL';
export const GROUPS_LAST_MONTH = 'GROUPS_LAST_MONTH';
export const GROUPS_LAST_YEAR = 'GROUPS_LAST_YEAR';
export const GROUP_STATS = 'GROUPS_STATS';
export const GROUP_SIZE_STATS = 'GROUP_SIZE_STATS';
export const GROUPS_LAST_MONTH_BAR_CHART = 'GROUPS_LAST_MONTH_BAR_CHART';
export const GROUPS_LAST_YEAR_BAR_CHART = 'GROUPS_LAST_YEAR_BAR_CHART';
export const GROUPS_LAST_MONTH_LINE_CHART = 'GROUPS_LAST_MONTH_LINE_CHART';
export const GROUPS_LAST_YEAR_LINE_CHART = 'GROUPS_LAST_YEAR_LINE_CHART';

export interface GroupAction {
  type: any;
  payload: any;
}

export interface GroupState {
  [key: string]: any;
  groupsTotal: number;
  groupsLastMonth: number;
  groupsLastYear: number;
  groupsLastWeek: Array<any>;
  groupsLastMonthBarChart: Array<any>;
  groupsLastYearBarChart: Array<any>;
  groupsLastMonthLineChart: Array<any>;
  groupsLastYearLineChart: Array<any>;
  groupStats: any;
  groupSizeStats: Array<any>;
}

export const initialGroupState = {
  groupStats: [],
  groupSizeStats: [],
  groupsTotal: 0,
  groupsLastWeek: [],
  groupsLastMonth: 0,
  groupsLastYear: 0,
  groupsLastMonthBarChart: [],
  groupsLastYearBarChart: [],
  groupsLastMonthLineChart: [],
  groupsLastYearLineChart: []
};
