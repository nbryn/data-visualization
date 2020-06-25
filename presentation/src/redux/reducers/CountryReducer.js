import { GENERAL_COUNTRY_STATS  } from "../actions/ActionTypes";

export default function(state = {}, action) {
  switch (action.type) {
    case GENERAL_COUNTRY_STATS :
      return Object.assign({}, state, {
        groupsCountry: action.payload.groupsCountry,
        usersCountry: action.payload.usersCountry,

      });
   
    default:
      return state;
  }
}
