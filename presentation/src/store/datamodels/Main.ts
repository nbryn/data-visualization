import {ChartData} from './General';

// Actions
const UPDATE_MAIN_VIEW_DATA = 'UPDATE_MAIN_VIEW_DATA';

// Action Types
export interface MainAction {
   type: typeof UPDATE_MAIN_VIEW_DATA;
   payload: MainState;
}

// Actions Creators
export function setMainViewData(data: MainState): MainAction {
   return {
      type: UPDATE_MAIN_VIEW_DATA,
      payload: data,
   };
}

// Reducers
export default function (state = {}, action: MainAction) {
   switch (action.type) {
      case UPDATE_MAIN_VIEW_DATA:
         return Object.assign({}, state, {
            ...action.payload,
         });
      default:
         return state;
   }
}

export interface MainState {
   [key: string]: any;
   usersTotal: number;
   teamsTotal: number;
   matchTotal: number;
   meetingTotal: number;
   usersLastYearBarChartData: ChartData[];
   usersLastYearLineChartData: ChartData[];
   teamsLastMonthData: ChartData[];
   teamsLastYearData: ChartData[];
   matchesLastYearData: ChartData[];
   userGenderStats: ChartData[];
}

export const initialMainState: MainState = {
   usersTotal: 0,
   teamsTotal: 0,
   matchTotal: 0,
   meetingTotal: 0,
   usersLastYearBarChartData: [],
   usersLastYearLineChartData: [],
   teamsLastYearData: [],
   matchesLastYearData: [],
   teamsLastMonthData: [],
   userGenderStats: [],
};
