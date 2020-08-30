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
                groupsLastMonthLineChart: action.payload.groupsLastMonthLineChart,
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

const initialChartjsData: ChartjsData = {
    labels: [],
    counter: 0,
    data: [],
}

export const initialChartjsState: ChartjsState = {
    groupsLastWeekBarChart: initialChartjsData,
    groupsLastMonthBarChart: initialChartjsData,
    groupsLastYearBarChart: initialChartjsData,
    groupsLastWeekLineChart: initialChartjsData,
    groupsLastMonthLineChart: initialChartjsData,
    groupsLastYearLineChart: initialChartjsData,
    usersLastMonthLineChart: initialChartjsData,
    usersLastWeekLineChart: initialChartjsData,
    usersLastYearLineChart: initialChartjsData,
    usersLastMonthBarChart: initialChartjsData,
    usersLastWeekBarChart: initialChartjsData,
    usersLastYearBarChart: initialChartjsData,
    genderData: {
        labels: [],
        data: [],
    },
    usersTotal: 0,
    groupsTotal: 0,
    meetingsTotal: 0,
    sharesTotal: 0,
};
