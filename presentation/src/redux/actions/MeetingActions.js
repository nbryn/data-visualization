import { MEETINGS_TOTAL, MEETING_STATS } from "../reducers/MeetingReducer";
import { fetchFromServer } from "./Fetch.ts";

export const fetchMeetingStats = () => async (dispatch) => {
  const data = `query{
    meetingStats{
      meetingTotal
      meetingsLastMonth{
          count
          day{
            year
            month
            day
          }
      }
      meetingsLastYear{
          year
          month
          count
      }
      meetingsPerGroup {
        name
        count
      }
      sharesPerMeeting {
        name
        count
      }
    }
  }`;

  const response = await fetchFromServer("meetingStats", data);

  dispatch({
    type: MEETING_STATS,
    payload: response,
  });
};

export const fetchTotalMeetings = () => async (dispatch) => {
    const data = `query{
      meetingStats{
        meetingTotal
      }
    }`;
  
    const response = await fetchFromServer("meetingStats", data);
  
    dispatch({
      type: MEETINGS_TOTAL,
      payload: response.meetingTotal,
    });
  };
