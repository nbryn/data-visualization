export const GENERAL_COUNTRY_STATS = "GENERAL_COUNTRY_STATS";

export default function(state = {}, action) {
  switch (action.type) {
    case GENERAL_COUNTRY_STATS :
      return Object.assign({}, state, {
        groupsCountry: action.payload.groupsCountry,
        usersCountry: action.payload.usersCountry,
        meetingsCountry: action.payload.meetingsCountry,

      });
   
    default:
      return state;
  }
}
