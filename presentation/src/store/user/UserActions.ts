import {
  USER_GENDER_STATS,
  USERS_TOTAL,
  USERS_TODAY,
  USERS_LAST_MONTH,
  USERS_LAST_YEAR,
  USER_STATS,
  USERS_LAST_MONTH_BAR_CHART,
  USERS_LAST_YEAR_BAR_CHART,
  USERS_LAST_MONTH_LINE_CHART,
  USERS_LAST_YEAR_LINE_CHART,
  CHARTJS_USERS_LAST_MONTH,
  CHARTJS_USERS_LAST_YEAR,
  UserAction
} from './UserTypes';

export function userGenderStats(data: any): UserAction {
  return {
    type: USER_GENDER_STATS,
    payload: data
  };
}

export function usersToday(data: any): UserAction {
  return {
    type: USERS_TODAY,
    payload: data
  };
}

export function usersTotal(data: number): UserAction {
  return {
    type: USERS_TOTAL,
    payload: data
  };
}

export function usersLastMonth(data: number): UserAction {
  return {
    type: USERS_LAST_MONTH,
    payload: data
  };
}

export function usersLastYear(data: number): UserAction {
  return {
    type: USERS_LAST_YEAR,
    payload: data
  };
}

export function userStats(data: any): UserAction {
  return {
    type: USER_STATS,
    payload: data
  };
}

export function usersLastMonthBarChart(data: any): UserAction {
  return {
    type: USERS_LAST_MONTH_BAR_CHART,
    payload: data
  };
}

export function usersLastYearBarChart(data: any): UserAction {
  return {
    type: USERS_LAST_YEAR_BAR_CHART,
    payload: data
  };
}

export function usersLastMonthLineChart(data: any): UserAction {
  return {
    type: USERS_LAST_MONTH_LINE_CHART,
    payload: data
  };
}

export function usersLastYearLineChart(data: any): UserAction {
  return {
    type: USERS_LAST_YEAR_LINE_CHART,
    payload: data
  };
}

export function chartjsUsersLastMonth(data: any): UserAction {
  return {
    type: CHARTJS_USERS_LAST_MONTH,
    payload: data
  };
}

export function chartjsUsersLastYear(data: any): UserAction {
  return {
    type: CHARTJS_USERS_LAST_YEAR,
    payload: data
  };
}
