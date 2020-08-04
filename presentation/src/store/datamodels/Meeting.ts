import { ChartData } from './General';

// Actions
const UPDATE_MEETING_VIEW_DATA = 'UPDATE_MEETING_VIEWA_DATA';

// Action Types
export interface MeetingAction {
    type: typeof UPDATE_MEETING_VIEW_DATA;
    payload: MeetingState;
}

// Action Creators
export function setMeetingViewData(data: MeetingState): MeetingAction {
    return {
        type: UPDATE_MEETING_VIEW_DATA,
        payload: data,
    };
}

export default function (state = {}, action: MeetingAction) {
    switch (action.type) {
        case UPDATE_MEETING_VIEW_DATA:
            return Object.assign({}, state, {
                totalData: action.payload.totalData,
                lastWeekData: action.payload.lastWeekData,
                lastMonthBarChartData: action.payload.lastMonthBarChartData,
                lastYearBarChartData: action.payload.lastYearBarChartData,
                lastYearData: action.payload.lastYearData,
                lastYearCountData: action.payload.lastYearCount,

            });
        case UPDATE_MEETING_VIEW_DATA:
            return Object.assign({}, state, {
                perGroupData: action.payload.perGroupData,
                sharesPerMeetingData: action.payload.sharesPerMeetingData,
                perCountryData: action.payload.perCountryData,
                todayCount: action.payload.todayCount,
                todayDate: action.payload.todayDate,
                lastMonthCount: action.payload.lastMonthCount,
                lastYearCount: action.payload.lastYearCount,
            });
        default:
            return state;
    }
}

export interface MeetingState {
    [key: string]: any;
    lastMonthBarChartData: ChartData[];
    lastMonthCount: number;
    lastYearCount: number;
    lastYearData: ChartData[];
    lastYearBarChartData: ChartData[];
    lastWeekData?: ChartData[];
    perCountryData: ChartData[];
    perGroupData: ChartData[];
    sharesPerMeetingData: ChartData[];
    todayCount: number;
    totalData: number;
    todayDate: string;
}

export const initialMeetingState: MeetingState = {
    totalData: 0,
    lastMonthCount: 0,
    lastYearCount: 0,
    lastWeekData: [],
    lastMonthBarChartData: [],
    lastYearBarChartData: [],
    lastYearData: [],
    sharesPerMeetingData: [],
    perGroupData: [],
    perCountryData: [],
    todayCount: 0,
    todayDate: '',
};
