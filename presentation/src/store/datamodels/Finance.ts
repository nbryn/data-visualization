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
   currencyData: ChartData[];
   eventTotal: number;
   eventsLastMonthData: ChartData[];
   eventsLastYearLineChartData: ChartData[];
   eventsLastYearBarChartData: ChartData[];
   meetingTotal: number;
   meetingsPerTeam: ChartData[];
   mostMeetings: string;
   etbEventCount: number;
   teamETBEventData: ChartData[];
}

export const initialFinanceState: FinanceState = {
   currencyData: [],
   eventTotal: 0,
   eventsLastMonthData: [],
   eventsLastYearLineChartData: [],
   eventsLastYearBarChartData: [],
   meetingTotal: 0,
   meetingsPerTeam: [],
   teamETBEventData: [],
   etbEventCount: 0,
   mostMeetings: '',
};
