import { USERS_TOTAL } from "../actions/ActionTypes";

export default function(state = {}, action) {
  switch (action.type) {
    case USERS_TOTAL:
      return Object.assign({}, state, {
        usersTotal: action.payload
      });
    default:
      return state;
  }
}
