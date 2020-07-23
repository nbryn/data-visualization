export const SET_CURRENT_USER = "SET_CURRENT_USER";

export default function (state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return Object.assign({}, state, {
        currentUser: action.payload.user,
        token: action.payload.token,
      });
    default:
      return state;
  }
}
