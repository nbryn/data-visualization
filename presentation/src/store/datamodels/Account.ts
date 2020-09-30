import {ChartData} from './General';

const UPDATE_ACCOUNT_VIEW_DATA = 'UPDATE_ACCOUNT_VIEW_DATA';

export interface AccountAction {
   type: typeof UPDATE_ACCOUNT_VIEW_DATA;
   payload: AccountState;
}

export function setAccountViewData(data: AccountState): AccountAction {
   return {
      type: UPDATE_ACCOUNT_VIEW_DATA,
      payload: data,
   };
}

export default function (state = {}, action: AccountAction) {
   switch (action.type) {
      case UPDATE_ACCOUNT_VIEW_DATA:
         return Object.assign({}, state, {
            ...action.payload,
         });
      default:
         return state;
   }
}

export interface AccountState {
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
   dollarEventCount: number;
   teamDollarEventData: ChartData[];
}

export const initialAccountState: AccountState = {
   currencyData: [],
   eventTotal: 0,
   eventsLastMonthData: [],
   eventsLastYearLineChartData: [],
   eventsLastYearBarChartData: [],
   meetingTotal: 0,
   meetingsPerTeam: [],
   teamDollarEventData: [],
   dollarEventCount: 0,
   mostMeetings: '',
};
