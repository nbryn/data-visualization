import {ChartData} from './General';

// Actions
const UPDATE_USER_VIEW_DATA = 'UPDATE_USER_VIEW_DATA';

// Action Types
export interface UserViewAction {
   type: typeof UPDATE_USER_VIEW_DATA;
   payload: UserState;
}

// Actions Creators
export function setUserViewData(data: UserState): UserViewAction {
   return {
      type: UPDATE_USER_VIEW_DATA,
      payload: data,
   };
}

// Reducers
export default function (state = initialUserState, action: UserViewAction): UserState {
   switch (action.type) {
      case UPDATE_USER_VIEW_DATA:
         return Object.assign({}, state, {
            ...action.payload,
         });
      default:
         return state;
   }
}

export interface UserState {
   [key: string]: string | number | ChartData[];
   lastMonthCount: number;
   lastMonthLineChartData: ChartData[];
   lastYearBarChartData: ChartData[];
   lastYearCount: number;
   lastYearLineChartData: ChartData[];
   lastWeek: ChartData[];
   genderStats: ChartData[];
   perCountryData: ChartData[];
   perOrgData: ChartData[];
   total: number;
   todayCount: number;
   todayDate: string;
}

export const initialUserState: UserState = {
   lastMonthBarChartData: [],
   lastMonthCount: 0,
   lastMonthLineChartData: [],
   lastYearBarChartData: [],
   lastYearCount: 0,
   lastYearLineChartData: [],
   lastWeek: [],
   perCountryData: [],
   perOrgData: [],
   genderStats: [],
   total: 0,
   todayDate: '',
   todayCount: 0,
};
