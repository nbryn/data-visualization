import { ChartData } from './General';

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
                currencyStats: action.payload.currencyStats,
                loansTotal: action.payload.loansTotal,
                loansLastMonthData: action.payload.loansLastMonthData,
                loansLastYearLineChartData:
                    action.payload.loansLastYearLineChartData,
                loansLastYearBarChartData:
                    action.payload.loansLastYearBarChartData,
                sharesTotal: action.payload.sharesTotal,
                sharesPerGroup: action.payload.sharesPerGroup,
                mostShares: action.payload.mostShares,
                etbOnLoan: action.payload.etbOnLoan,
                groupEtbLoan: action.payload.groupEtbLoan,

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
