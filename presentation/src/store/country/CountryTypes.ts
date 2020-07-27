export const GENERAL_COUNTRY_STATS = 'GENERAL_COUNTRY_STATS';
export const GROUPS_PER_COUNTRY = 'GROUPS_PER_COUNTRY';

export interface CountryAction {
  type: any;
  payload: any;
}

export interface CountryState {
  generalCountryStats: Array<any>;
  countryGroups: Array<any>;
}

export const initialCountryState = {
  generalCountryStats: [],
  countryGroups: [],
};
