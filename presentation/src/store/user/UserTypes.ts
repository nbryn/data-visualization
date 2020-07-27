export const USER_GENDER_STATS = 'USER_GENDER_STATS';
export const USERS_TOTAL = 'USERS_TOTAL';
export const USER_STATS = 'USER_STATS';
export const USERS_LAST_MONTH_BAR_CHART = 'USERS_LAST_MONTH_BAR_CHART';
export const USERS_LAST_MONTH_LINE_CHART = 'USERS_LAST_MONTH_LINE_CHART';
export const USERS_LAST_YEAR_BAR_CHART = 'USERS_LAST_YEAR_BAR_CHART';
export const USERS_LAST_YEAR_LINE_CHART = 'USERS_LAST_YEAR_LINE_CHART';

export const CHARTJS_USERS_LAST_MONTH = 'CHARTJS_USERS_LAST_MONTH';
export const CHARTJS_USERS_LAST_YEAR = 'CHART_JS_USERS_LAST_YEAR';

export interface UserAction {
  type: any;
  payload: any;
}

export interface UserState {
  [key: string]: any;
  genderStats: Array<any>;
  usersTotal: number;
  usersLastWeek: Array<any>;
  usersLastMonthBarChart: Array<any>;
  usersLastYearBarChart: Array<any>;
  usersLastMonthLineChart: Array<any>;
  usersLastYearLineChart: Array<any>;
  userStats: any;
  chartjsUsersLastMonth: Array<any>;
  chartjsUsersLastYear: Array<any>;
}

export const initialUserState = {
  genderStats: [],
  userStats: [],
  usersTotal: 0,
  usersLastWeek: [],
  usersLastMonthBarChart: [],
  usersLastYearBarChart: [],
  usersLastMonthLineChart: [],
  usersLastYearLineChart: [],
  chartjsUsersLastMonth: [],
  chartjsUsersLastYear: []
};
