import {
  GENERAL_COUNTRY_STATS,
  GROUPS_PER_COUNTRY,
  USERS_PER_COUNTRY,
  MEETINGS_PER_COUNTRY,
  CountryAction
} from './CountryTypes';

export function updateCountryStatsData(data: any): CountryAction {
  return {
    type: GENERAL_COUNTRY_STATS,
    payload: data
  };
}

export function updateGroupsPerCountryData(data: any): CountryAction {
  return {
    type: GROUPS_PER_COUNTRY,
    payload: data
  };
}

export function updateUsersPerCountryData(data: any): CountryAction {
  return {
    type: USERS_PER_COUNTRY,
    payload: data
  };
}

export function updateMeetingsPerCountryData(data: any): CountryAction {
  return {
    type: MEETINGS_PER_COUNTRY,
    payload: data
  };
}
