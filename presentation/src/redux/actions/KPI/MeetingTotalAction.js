import axios from "axios";

import { MEETING_TOTAL } from "../ActionTypes";

const url = "http://localhost:4000/graphql";

export const fetchMeetingTotal = () => async dispatch => {
  const data = `query{
        meetingTotal
 
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
        type: MEETING_TOTAL,
        payload: response.data.data.meetingTotal
      });

  } catch (err) {
    console.log(err);
  }
};