export const FINANCE_STATS = 'FINANCE_STATS';
export const SHARES_TOTAL = 'SHARES_TOTAL';

interface FinanceAction {
  type: any;
  payload: any;
}

export function financeStats(data: any): FinanceAction {
  return {
    type: FINANCE_STATS,
    payload: data
  };
}

export function sharesTotal(data: number): FinanceAction {
  return {
    type: SHARES_TOTAL,
    payload: data
  };
}
