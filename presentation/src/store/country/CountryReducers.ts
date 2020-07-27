import { GENERAL_COUNTRY_STATS, GROUPS_PER_COUNTRY, USERS_PER_COUNTRY } from './CountryTypes';

export default function (state = {}, action: any) {
  switch (action.type) {
    case GENERAL_COUNTRY_STATS:
      return Object.assign({}, state, {
        groupsCountry: action.payload.groupsCountry,
        usersCountry: action.payload.usersCountry,
        meetingsCountry: action.payload.meetingsCountry
      });
      case GROUPS_PER_COUNTRY:
      return Object.assign({}, state, {
        countryGroups: action.payload,
      });
      case USERS_PER_COUNTRY:
      return Object.assign({}, state, {
        countryUsers: action.payload,
      });

    default:
      return state;
  }
}
