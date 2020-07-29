export const UPDATE_FINANCE_VIEW_DATA = 'UPDATE_FINANCE_VIEW_DATA';

export interface FinanceAction {
  type: any;
  payload: FinanceState;
}

export function updateFinanceViewData(data: FinanceState): FinanceAction {
  return {
    type: UPDATE_FINANCE_VIEW_DATA,
    payload: data
  };
}

export default function (state = {}, action: FinanceAction) {
  switch (action.type) {
    case UPDATE_FINANCE_VIEW_DATA:
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
