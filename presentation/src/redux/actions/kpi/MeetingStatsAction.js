import { MEETING_STATS } from "../ActionTypes";
import { fetchFromServer } from "../Fetch";

export const fetchMeetingStats = () => async dispatch => {
  const data = `query{
    meetingStats{
      meetingTotal
      meetingsLastMonth{
        data{
          count
          day{
            year
            month
            day
          }
        }
      }
      meetingsLastYear{
        data{
          year
          month
          count
          
        }
      }
    }
  }`;

  const response = await fetchFromServer("post", data);

  dispatch({
    type: MEETING_STATS,
    payload: response.data.data.meetingStats
  });
};
