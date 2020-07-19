import { MEETING_STATS } from "../ActionTypes.ts";
import { fetchFromServer } from "../Fetch.ts";

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
