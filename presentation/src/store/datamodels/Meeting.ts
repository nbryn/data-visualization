const UPDATE_MEETING_VIEW_DATA = 'UPDATE_MEETING_VIEWA_DATA';

export function updateMeetingViewData(data: MeetingState): MeetingAction {
  return {
    type: UPDATE_MEETING_VIEW_DATA,
    payload: data
  };
}

export default function (state = {}, action: MeetingAction) {
  switch (action.type) {
    case UPDATE_MEETING_VIEW_DATA:
      console.log(action);
      return Object.assign({}, state, {
        totalData: action.payload.totalData,
        lastWeekData: action.payload.lastWeekData,
        lastMonthBarChartData: action.payload.lastMonthBarChartData,
        lastYearBarChartData: action.payload.lastYearBarChartData,
        lastYearData: action.payload.lastYearData,
        lastYearCountData: action.payload.lastYearCount,
        perGroupData: action.payload.perGroupData,
        sharesPerMeetingData: action.payload.sharesPerMeetingData,
        perCountryData: action.payload.perCountryData,
        todayCount: action.payload.todayCount,
        todayDate: action.payload.todayDate,
        lastMonthCount: action.payload.lastMonthCount,
        lastYearCount: action.payload.lastYearCount
      });
    default:
      return state;
  }
}

export interface MeetingAction {
  type: any;
  payload: MeetingState;
}

export interface MeetingState {
  [key: string]: any;
  lastMonthBarChartData: Array<any>;
  lastMonthCount: number;
  lastYearCount: number;
  lastYearData: Array<any>;
  lastYearBarChartData: Array<any>;
  lastWeekData?: Array<any>;
  perCountryData: Array<any>;
  perGroupData: Array<any>;
  sharesPerMeetingData: Array<any>;
  todayCount: number;
  totalData: number;
  todayDate: any;
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
  todayDate: null
};
