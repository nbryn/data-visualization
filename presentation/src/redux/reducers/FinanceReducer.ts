export const FINANCE_STATS = "FINANCE_STATS";
export const SHARES_TOTAL = "SHARES_TOTAL";

export default function (state = {}, action: any) {
  switch (action.type) {
    case FINANCE_STATS:
      return Object.assign({}, state, {
        financeStats: action.payload,
      });
      case SHARES_TOTAL:
        return Object.assign({}, state, {
          sharesTotal: action.payload,
        });

    default:
      return state;
  }
}
