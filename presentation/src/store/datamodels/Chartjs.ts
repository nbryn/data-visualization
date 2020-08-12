// Actions
const UPDATE_CHARTJS_DATA = 'UPDATE_CHARTJS_DATA';

export type ChartjsPieData = {
    labels: string[];
    data: number[];
};

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
                groupsLastWeekBarChart: action.payload.groupsLastWeekBarChart,
                groupsLastMonthBarChart: action.payload.groupsLastMonthBarChart,
                groupsLastYearBarChart: action.payload.groupsLastYearBarChart,
                groupsLastWeekLineChart: action.payload.groupsLastWeekLineChart,
                groupsLastMonthLineChart:
                    action.payload.groupsLastMonthLineChart,
                groupsLastYearLineChart: action.payload.groupsLastYearLineChart,
                usersLastWeekLineChart: action.payload.usersLastWeekLineChart,
                usersLastMonthLineChart: action.payload.usersLastMonthLineChart,
                usersLastYearLineChart: action.payload.usersLastYearLineChart,
                usersLastWeekBarChart: action.payload.usersLastWeekBarChart,
                usersLastMonthBarChart: action.payload.usersLastMonthBarChart,
                usersLastYearBarChart: action.payload.usersLastYearBarChart,
                usersTotal: action.payload.usersTotal,
                genderData: action.payload.genderData,
                groupsTotal: action.payload.groupsTotal,
                meetingsTotal: action.payload.meetingsTotal,
                sharesTotal: action.payload.sharesTotal,
            });
        default:
            return state;
    }
}

export interface ChartjsState {
    [key: string]: number | ChartjsData | any;
    groupsLastWeekBarChart: ChartjsData;
    groupsLastMonthBarChart: ChartjsData;
    groupsLastYearBarChart: ChartjsData;
    groupsLastWeekLineChart: ChartjsData;
    groupsLastMonthLineChart: ChartjsData;
    groupsLastYearLineChart: ChartjsData;
    usersLastMonthLineChart: ChartjsData;
    usersLastWeekLineChart: ChartjsData;
    usersLastYearLineChart: ChartjsData;
    usersLastMonthBarChart: ChartjsData;
    usersLastWeekBarChart: ChartjsData;
    usersLastYearBarChart: ChartjsData;
    genderData: ChartjsPieData | null;
    usersTotal: number;
    groupsTotal: number;
    meetingsTotal: number;
    sharesTotal: number;
}

export const initialChartjsState: ChartjsState = {
    groupsLastWeekBarChart: {
        labels: [],
        counter: 0,
        data: [],
    },
    groupsLastMonthBarChart: {
        labels: [],
        counter: 0,
        data: [],
    },
    groupsLastYearBarChart: {
        labels: [],
        counter: 0,
        data: [],
    },
    groupsLastWeekLineChart: {
        labels: [],
        counter: 0,
        data: [],
    },
    groupsLastMonthLineChart: {
        labels: [],
        counter: 0,
        data: [],
    },
    groupsLastYearLineChart: {
        labels: [],
        counter: 0,
        data: [],
    },
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
    genderData: {
        labels: [],
        data: [],
    },
    usersTotal: 0,
    groupsTotal: 0,
    meetingsTotal: 0,
    sharesTotal: 0,
};
