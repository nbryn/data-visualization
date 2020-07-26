export interface FinanceState {
  [key: string]: any;
  currencyTotal: number;
  currencyStats: Array<any>;
  loanTotal: number;
  loansLastMonth: Array<any>;
  loansLastYear: Array<any>;
  sharesTotal: number;
  shareStats: Array<any>;
  etbStats: Array<any>;
  boxBalanceStats: Array<any>;
  financeStats: any;
}

export const initialFinanceState = {
  financeStats: [],
  currencyTotal: null,
  currencyStats: [],
  loanTotal: null,
  loansLastMonth: [],
  loansLastYear: [],
  sharesTotal: 0,
  shareStats: [],
  etbStats: [],
  boxBalanceStats: []
};
