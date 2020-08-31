import {ChartData} from './General';

const UPDATE_FINANCE_VIEW_DATA = 'UPDATE_FINANCE_VIEW_DATA';

export interface FinanceAction {
   type: typeof UPDATE_FINANCE_VIEW_DATA;
   payload: FinanceState;
}

export function setFinanceViewData(data: FinanceState): FinanceAction {
   return {
      type: UPDATE_FINANCE_VIEW_DATA,
      payload: data,
   };
}

export default function (state = {}, action: FinanceAction) {
   switch (action.type) {
      case UPDATE_FINANCE_VIEW_DATA:
         return Object.assign({}, state, {
            ...action.payload,
         });
      default:
         return state;
   }
}

export interface FinanceState {
   [key: string]: any;
   numberOfCurrencies?: number;
   currencyStats: ChartData[];
   loansTotal: number;
   loansLastMonthData: ChartData[];
   loansLastYearLineChartData: ChartData[];
   loansLastYearBarChartData: ChartData[];
   sharesTotal: number;
   sharesPerGroup: ChartData[];
   mostShares: string;
   etbOnLoan: number;
   groupEtbLoan: ChartData[];
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
   mostShares: '',
};
