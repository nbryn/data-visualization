export const GENERAL_COUNTRY_STATS = 'GENERAL_COUNTRY_STATS';
export const GROUPS_PER_COUNTRY = 'GROUPS_PER_COUNTRY';
export const USERS_PER_COUNTRY = 'USERS_PER_COUNTRY';
export const MEETINGS_PER_COUNTRY = 'MEETINGS_PER_COUNTRY';

export interface CountryAction {
  type: any;
  payload: any;
}

export interface CountryState {
  generalCountryStats: Array<any>;
  countryGroups: Array<any>;
  countryUsers: Array<any>;
  countryMeetings: Array<any>;
}

export const initialCountryState = {
  generalCountryStats: [],
  countryGroups: [],
  countryUsers: [],
  countryMeetings: []
};
