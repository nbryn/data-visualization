export const MEETINGS_TOTAL = 'MEETINGS_TOTAL';
export const UPDATE_MEETING_DATA = 'UPDATE_MEETING_DATA';
export const MEETINGS_LAST_MONTH = 'MEETINGS_LAST_MONTH';
export const MEETINGS_LAST_YEAR = 'MEETINGS_LAST_YEAR';
export const MEETINGS_PER_GROUP = 'MEETINGS_PER_GROUP';

export function updateMeetingsLastMonthData(data: any): MeetingAction {
  return {
    type: MEETINGS_LAST_MONTH,
    payload: data
  };
}

export function updateMeetingsLastYearData(data: any): MeetingAction {
  return {
    type: MEETINGS_LAST_YEAR,
    payload: data
  };
}

// export function updateMeetingsTotalData(data: number): MeetingAction {
//   return {
//     type: MEETINGS_TOTAL,
//     payload: data
//   };
// }

export function updateMeetingData(data: MeetingState): MeetingAction {
  return {
    type: UPDATE_MEETING_DATA,
    payload: data
  };
}

export default function (state = {}, action: MeetingAction) {
  switch (action.type) {
    case UPDATE_MEETING_DATA:
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
    case UPDATE_MEETING_DATA:
      return Object.assign({}, state, {
        meetingStats: action.payload
      });
    case MEETINGS_LAST_MONTH:
      return Object.assign({}, state, {
        meetingsLastMonth: action.payload,
        meetingsLastWeek: action.payload.meetingsLastWeek
      });
    case MEETINGS_LAST_YEAR:
      return Object.assign({}, state, {
        meetingsLastYear: action.payload
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
