import {
  USER_GENDER_STATS,
  USERS_TOTAL,
  USER_STATS,
  USERS_LAST_MONTH,
  USERS_LAST_YEAR,
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

export function usersTotal(data: number): UserAction {
  return {
    type: USERS_TOTAL,
    payload: data
  };
}

export function userStats(data: any): UserAction {
  return {
    type: USER_STATS,
    payload: data
  };
}

export function usersLastMonth(data: any): UserAction {
  return {
    type: USERS_LAST_MONTH,
    payload: data
  };
}

export function usersLastYear(data: any): UserAction {
  return {
    type: USERS_LAST_YEAR,
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
