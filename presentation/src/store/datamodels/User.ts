const CHARTJS_USERS_LAST_MONTH = 'CHARTJS_USERS_LAST_MONTH';
const CHARTJS_USERS_LAST_YEAR = 'CHART_JS_USERS_LAST_YEAR';
const UPDATE_USER_VIEW_DATA = 'UPDATE_USER_VIEW_DATA';

export interface UserAction {
    type: any;
    payload: UserState;
}

export function updateUserViewData(data: UserState): UserAction {
    return {
        type: UPDATE_USER_VIEW_DATA,
        payload: data,
    };
}

export function updateChartjsLastMonthUserData(data: any): any {
    return {
        type: CHARTJS_USERS_LAST_MONTH,
        payload: data,
    };
}

export function updateChartjsLastYearUserData(data: any): any {
    return {
        type: CHARTJS_USERS_LAST_YEAR,
        payload: data,
    };
}

export default function (state = {}, action: UserAction) {
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
    [key: string]: any;
    genderStats: Array<any>;
    total: number;
    todayCount: number;
    todayDate: string;
    lastMonthCount: number;
    lastYearCount: number;
    lastWeek: Array<any>;
    lastMonthBarChartData: Array<any>;
    lastYearBarChartData: Array<any>;
    lastMonthLineChartData: Array<any>;
    lastYearLineChartData: Array<any>;
    chartjsLastWeek: Array<any>;
    chartjsLastMonth: Array<any>;
    chartjsLastYear: Array<any>;
    perNGOData: Array<any>;
    perCountryData: Array<any>;
}

export const initialUserState: UserState = {
    genderStats: [],
    total: 0,
    todayDate: '',
    todayCount: 0,
    lastMonthCount: 0,
    lastYearCount: 0,
    lastWeek: [],
    lastMonthBarChartData: [],
    lastYearBarChartData: [],
    lastMonthLineChartData: [],
    lastYearLineChartData: [],
    chartjsLastWeek: [],
    chartjsLastMonth: [],
    chartjsLastYear: [],
    perNGOData: [],
    perCountryData: [],
};
