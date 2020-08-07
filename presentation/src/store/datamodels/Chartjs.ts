import { ChartData } from './General';

// Actions
const UPDATE_CHARTJS_DATA = 'UPDATE_CHARTJS_DATA';

export type ChartjsData = {
    labels: string[];
    data: number[];
    counter: number;
};

export type ChartjsLastMonthData = {
    labels: string[];
    data: number[];
    counter: number;
    lastWeek: ChartjsData;
};

export interface ChartjsAction {
    type: typeof UPDATE_CHARTJS_DATA;
    payload: ChartjsState;
}

// Actions Creators
export function setChartjsData(data: ChartjsState): ChartjsAction {
    return {
        type: UPDATE_CHARTJS_DATA,
        payload: data,
    };
}

// Reducers
export default function (state = {}, action: ChartjsAction) {
    switch (action.type) {
        case UPDATE_CHARTJS_DATA:
            return Object.assign({}, state, {
                usersLastWeekLineChart: action.payload.usersLastWeekLineChart,
                usersLastMonthLineChart: action.payload.usersLastMonthLineChart,
                usersLastYearLineChart: action.payload.usersLastYearLineChart,
                usersLastWeekBarChart: action.payload.usersLastWeekBarChart,
                usersLastMonthBarChart: action.payload.usersLastMonthBarChart,
                usersLastYearBarChart: action.payload.usersLastYearBarChart
            });
        default:
            return state;
    }
}

export interface ChartjsState {
    [key: string]: ChartjsData;
    usersLastMonthLineChart: ChartjsData;
    usersLastWeekLineChart: ChartjsData;
    usersLastYearLineChart: ChartjsData;
    usersLastMonthBarChart: ChartjsData;
    usersLastWeekBarChart: ChartjsData;
    usersLastYearBarChart: ChartjsData;
}

export const initialChartjsState: ChartjsState = {
    usersLastMonthLineChart: {
        labels: [],
        counter: 0,
        data: [],
    },
    usersLastWeekLineChart: {
        labels: [],
        counter: 0,
        data: [],
    },
    usersLastYearLineChart: {
        labels: [],
        counter: 0,
        data: [],
    },
    usersLastMonthBarChart: {
        labels: [],
        counter: 0,
        data: [],
    },
    usersLastWeekBarChart: {
        labels: [],
        counter: 0,
        data: [],
    },
    usersLastYearBarChart: {
        labels: [],
        counter: 0,
        data: [],
    },
};