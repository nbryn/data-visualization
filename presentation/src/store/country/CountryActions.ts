import { GENERAL_COUNTRY_STATS, GROUPS_PER_COUNTRY, CountryAction } from './CountryTypes';

export function countryStats(data: any): CountryAction {
  return {
    type: GENERAL_COUNTRY_STATS,
    payload: data
  };
}


export function groupsPerCountry(data: any): CountryAction {
  return {
    type: GROUPS_PER_COUNTRY,
    payload: data
  };
}