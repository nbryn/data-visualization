import {ChartData} from './General';

// Actions
const UPDATE_MATCH_VIEW_DATA = 'UPDATE_MATCH_VIEW_DATA';

// Action Types
export interface MatchAction {
   type: typeof UPDATE_MATCH_VIEW_DATA;
   payload: MatchState;
}

// Action Creators
export function setMatchViewData(data: MatchState): MatchAction {
   return {
      type: UPDATE_MATCH_VIEW_DATA,
      payload: data,
   };
}

export default function (state = {}, action: MatchAction) {
   switch (action.type) {
      case UPDATE_MATCH_VIEW_DATA:
         return Object.assign({}, state, {
            ...action.payload,
         });

      default:
         return state;
   }
}

export interface MatchState {
   [key: string]: any;
   lastMonthBarChartData: ChartData[];
   lastMonthCount: number;
   lastYearCount: number;
   lastYearData: ChartData[];
   lastYearBarChartData: ChartData[];
   lastWeekData?: ChartData[];
   perCountryData: ChartData[];
   perTeamData: ChartData[];
   meetingsPerMatchData: ChartData[];
   todayCount: number;
   totalData: number;
   todayDate: string;
}

export const initialMatchState: MatchState = {
   totalData: 0,
   lastMonthCount: 0,
   lastYearCount: 0,
   lastWeekData: [],
   lastMonthBarChartData: [],
   lastYearBarChartData: [],
   lastYearData: [],
   meetingsPerMatchData: [],
   perTeamData: [],
   perCountryData: [],
   todayCount: 0,
   todayDate: '',
};
