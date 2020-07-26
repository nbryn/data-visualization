import {
  MEETINGS_LAST_MONTH,
  MEETINGS_LAST_YEAR,
  MEETING_STATS,
  MEETINGS_TOTAL,
  MeetingAction
} from './MeetingTypes';

export function meetingsLastMonth(data: any): MeetingAction {
  return {
    type: MEETINGS_LAST_MONTH,
    payload: data
  };
}

export function meetingsLastYear(data: any): MeetingAction {
  return {
    type: MEETINGS_LAST_YEAR,
    payload: data
  };
}

export function meetingStats(data: any): MeetingAction {
  return {
    type: MEETING_STATS,
    payload: data
  };
}

export function meetingsTotal(data: number): MeetingAction {
  return {
    type: MEETINGS_TOTAL,
    payload: data
  };
}
