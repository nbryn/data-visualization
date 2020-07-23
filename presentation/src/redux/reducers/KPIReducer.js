export const KEY_STATS = "KEY_STATS";
export const ENGAGEMENT_STATS = "ENGAGEMENT_STATS";

export default function (state = {}, action) {
  switch (action.type) {
    case KEY_STATS:
      return Object.assign({}, state, {
        keyStats: action.payload,
      });
    case ENGAGEMENT_STATS:
      return Object.assign({}, state, {
        engagementStats: action.payload,
      });

    default:
      return state;
  }
}
