import axios from "axios";

import { MEETING_STATS } from "../ActionTypes";

const url = "http://localhost:4000/graphql";

export const fetchMeetingStats = () => async dispatch => {
  const data = `query{
    meetingStats{
      meetingTotal
      meetingMonth{
        meetings{
          count
          day{
            year
            month
            day
          }
        }
      }
      meetingYear{
        meetings{
          count
          month
        }
      }
    }
  }`;

  let response;

  try {
    response = await axios({
      url,
      method: "post",
      data: {
        query: data
      }
    });

    dispatch({
        type: MEETING_STATS,
        payload: response.data.data.meetingStats
      });

  } catch (err) {
    console.log(err);
  }
};