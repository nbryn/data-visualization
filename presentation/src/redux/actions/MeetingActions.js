import { convertNumberToMonth } from "../../util/Date";
import { fetchFromServer } from "./Fetch.ts";
import { MEETINGS_TOTAL, MEETING_STATS, MEETINGS_LAST_YEAR } from "../reducers/MeetingReducer";


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


export const fetchMeetingsLastYear = () => async (dispatch) => {
  const data = `query{
    meetingStats{
      meetingsLastYear{
          year
          month
          count
      }   
    }
  }`;

  const response = await fetchFromServer("meetingStats", data);

  let total = 0;
  let month, year;
  const newState = response.meetingsLastYear.map((element) => {
    total += element.count;
    year = element.year.toString().substring(2);
    month = convertNumberToMonth(element.month);

    return {
      name: month + " '" + year,
      value: total,
    };
  });

  dispatch({
    type: MEETINGS_LAST_YEAR,
    payload: newState,
  });
};