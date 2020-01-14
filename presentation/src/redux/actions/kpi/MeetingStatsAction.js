import axios from "axios";

import { MEETING_STATS } from "../ActionTypes";

const url = "/graphql";

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