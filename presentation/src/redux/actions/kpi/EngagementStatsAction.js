import { ENGAGEMENT_STATS } from "../ActionTypes";
import { fetchFromServer } from "../Fetch";

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

  const response = await fetchFromServer("post", data);

  dispatch({
    type: ENGAGEMENT_STATS,
    payload: response.data.data.engagementStats
  });
};
