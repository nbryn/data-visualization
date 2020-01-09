import axios from "axios";
import { ENGAGEMENT_STATS } from "../ActionTypes";

const url = "/graphql";

export const fetchEngagementStats = () => async dispatch => {
  const data = `query{
    engagementStats{
      groupEngagement{
      activeGroups
      groupActivity {
        value
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

    console.log(response.data.data.engagementStats);

    dispatch({
      type: ENGAGEMENT_STATS,
      payload: response.data.data.engagementStats
    });
  } catch (err) {
    console.log(err);
  }
};
