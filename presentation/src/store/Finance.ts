export const UPDATE_FINANCE_DATA = 'UPDATE_FINANCE_STATS';
export const SHARES_TOTAL = 'SHARES_TOTAL';
export const LOANS_TOTAL = 'LOANS_TOTAL';
export const NUMBER_OF_CURRENCIES = 'NUMBER_OF_CURRENCIES';
export const ETB_ON_LOAN = 'ETB_ON_LOAN';
export const GROUP_ETB_LOAN = 'GROUP_ETB_LOAN';
export const LOANS_LAST_MONTH = 'LOANS_LAST_MONTH';
export const LOANS_LAST_YEAR_LINE_CHART = 'LOANS_LAST_YEAR_LINE_CHART';
export const LOANS_LAST_YEAR_BAR_CHART = 'LOANS_LAST_YEAR_BAR_CHART';
export const MOST_SHARES = 'MOST_SHARES';
export const SHARES_PER_GROUP = 'SHARES_PER_GROUP';
export const CURRENCY_STATS = 'CURRENCY_STATS';

export interface FinanceAction {
  type: any;
  payload: FinanceState;
}

export function updateFinanceData(data: FinanceState): FinanceAction {
  return {
    type: UPDATE_FINANCE_DATA,
    payload: data
  };
}

export default function (state = {}, action: FinanceAction) {
  switch (action.type) {
    case UPDATE_FINANCE_DATA:
      return Object.assign({}, state, {
        currencyStats: action.payload.currencyStats,
        loansTotal: action.payload.loansTotal,
        loansLastMonthData: action.payload.loansLastMonthData,
        loansLastYearLineChartData: action.payload.loansLastYearLineChartData,
        loansLastYearBarChartData: action.payload.loansLastYearBarChartData,
        sharesTotal: action.payload.sharesTotal,
        sharesPerGroup: action.payload.sharesPerGroup,
        mostShares: action.payload.mostShares,
        etbOnLoan: action.payload.etbOnLoan,
        groupEtbLoan: action.payload.groupEtbLoan
      });
    default:
      return state;
  }
}

export interface FinanceState {
  [key: string]: any;
  numberOfCurrencies?: number;
  currencyStats: Array<any>;
  loansTotal: number;
  loansLastMonthData: Array<any>;
  loansLastYearLineChartData: Array<any>;
  loansLastYearBarChartData: Array<any>;
  sharesTotal: number;
  sharesPerGroup: Array<any>;
  mostShares: any;
  etbOnLoan: number;
  groupEtbLoan: Array<any>;
  boxBalanceStats?: Array<any>;
  financeStats?: any;
}

export const initialFinanceState: FinanceState = {
  currencyStats: [],
  loansTotal: 0,
  loansLastMonthData: [],
  loansLastYearLineChartData: [],
  loansLastYearBarChartData: [],
  sharesTotal: 0,
  sharesPerGroup: [],
  groupEtbLoan: [],
  etbOnLoan: 0,
  mostShares: null
};
