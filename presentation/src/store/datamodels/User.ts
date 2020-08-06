import { ChartData } from './General';

// Actions
const CHARTJS_USERS_LAST_MONTH = 'CHARTJS_USERS_LAST_MONTH';
const CHARTJS_USERS_LAST_YEAR = 'CHART_JS_USERS_LAST_YEAR';
const UPDATE_USER_VIEW_DATA = 'UPDATE_USER_VIEW_DATA';

// Action Types
export interface UserViewAction {
    type: typeof UPDATE_USER_VIEW_DATA;
    payload: UserState;
}

export type ChartjsData = {
    labels: string[];
    data: number[];
    counter: number;
}

export type ChartjsLastMonthData = {
    labels: string[];
    data: number[];
    counter: number;
    lastWeek: ChartjsData;
}

export interface ChartjsLastMonthAction {
    type: typeof CHARTJS_USERS_LAST_MONTH | typeof CHARTJS_USERS_LAST_YEAR;
    payload: ChartjsLastMonthData;
}

export interface ChartjsLastYearAction {
    type: typeof CHARTJS_USERS_LAST_YEAR;
    payload: ChartjsData;
}

type UserActions = UserViewAction | ChartjsLastMonthAction | ChartjsLastYearAction;

// Actions Creators
export function setUserViewData(data: UserState): UserViewAction {
    return {
        type: UPDATE_USER_VIEW_DATA,
        payload: data,
    };
}

export function setChartjsLastMonthUserData(data: ChartjsLastMonthData): ChartjsLastMonthAction {
    return {
        type: CHARTJS_USERS_LAST_MONTH,
        payload: data,
    };
}

export function setChartjsLastYearUserData(data: ChartjsData): ChartjsLastYearAction {
    return {
        type: CHARTJS_USERS_LAST_YEAR,
        payload: data,
    };
}

// Reducers
export default function (state = {}, action: UserActions) {
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
        case CHARTJS_USERS_LAST_MONTH:
            return Object.assign({}, state, {
                chartjsLastWeek: action.payload.lastWeek,
                chartjsLastMonth: action.payload,
            });
        case CHARTJS_USERS_LAST_YEAR:
            return Object.assign({}, state, {
                chartjsLastYear: action.payload,
            });

        default:
            return state;
    }
}

export interface UserState {
    [key: string]: string | number | ChartData[] | ChartjsData;
    chartjsLastMonth: ChartjsData;
    chartjsLastWeek: ChartjsData;
    chartjsLastYear: ChartjsData;
    lastMonthBarChartData: ChartData[];
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
    chartjsLastMonth: {
        labels: [],
        counter: 0,
        data: []
    },
    chartjsLastWeek: {
        labels: [],
        counter: 0,
        data: []
    },
    chartjsLastYear: {
        labels: [],
        counter: 0,
        data: []
    },
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
