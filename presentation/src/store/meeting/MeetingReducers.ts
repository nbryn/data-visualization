import {
  MEETINGS_LAST_MONTH,
  MEETINGS_LAST_YEAR,
  MEETING_STATS,
  MEETINGS_TOTAL
} from './MeetingTypes';

export default function (state = {}, action: any) {
  switch (action.type) {
    case MEETINGS_TOTAL:
      return Object.assign({}, state, {
        meetingsTotal: action.payload
      });
    case MEETING_STATS:
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
