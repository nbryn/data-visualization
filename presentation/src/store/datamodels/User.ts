import { ChartData } from './General';

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
export default function (state = {}, action: UserViewAction) {
    switch (action.type) {
        case UPDATE_USER_VIEW_DATA:
            return Object.assign({}, state, {
                genderStats: action.payload.genderStats,
                total: action.payload.total,
                todayDate: action.payload.todayDate,
                todayCount: action.payload.todayCount,
                lastMonthCount: action.payload.lastMonthCount,
                lastYearCount: action.payload.lastYearCount,
                lastMonthBarChartData: action.payload.lastMonthBarChartData,
                lastYearBarChartData: action.payload.lastYearBarChartData,
                lastMonthLineChartData: action.payload.lastMonthLineChartData,
                lastYearLineChartData: action.payload.lastYearLineChartData,
                perNGOData: action.payload.perNGOData,
                perCountryData: action.payload.perCountryData,
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
    perNGOData: ChartData[];
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
    perNGOData: [],
    genderStats: [],
    total: 0,
    todayDate: '',
    todayCount: 0,
};
