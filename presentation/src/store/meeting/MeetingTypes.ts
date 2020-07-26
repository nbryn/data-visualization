export const MEETINGS_TOTAL = 'MEETINGS_TOTAL';
export const MEETING_STATS = 'MEETINGS_STATS';
export const MEETINGS_LAST_MONTH = 'MEETINGS_LAST_MONTH';
export const MEETINGS_LAST_YEAR = 'MEETINGS_LAST_YEAR';

export interface MeetingAction {
  type: any;
  payload: any;
}

export interface MeetingState {
  [key: string]: any;
  meetingsTotal: number;
  meetingsLastWeek: Array<any>;
  meetingsLastMonth: Array<any>;
  meetingsLastYear: Array<any>;
  meetingStats: any;
}

export const inititalMeetingState = {
  meetingStats: [],
  meetingsTotal: 0,
  meetingsLastWeek: [],
  meetingsLastMonth: [],
  meetingsLastYear: []
};
