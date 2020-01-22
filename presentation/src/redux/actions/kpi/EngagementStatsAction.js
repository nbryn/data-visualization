import { ENGAGEMENT_STATS } from "../ActionTypes";
import { fetchFromServer } from "../Fetch";

export const fetchEngagementStats = () => async dispatch => {
  let engagementStats = {
    groupEngagement: "",
    userEngagement: ""
  };

  
  const groupResponse = await fetchGroupEngagementStats();
  engagementStats.groupEngagement = groupResponse.groupEngagement;

  
  const userResponse = await fetchUserEngagementStats();
  engagementStats.userEngagement = userResponse.userStats.usersActive;

  dispatch({
    type: ENGAGEMENT_STATS,
    payload: engagementStats
  });
};


async function fetchGroupEngagementStats() {
  const groupQuery = `query{
    groupEngagement{
      groupsActive
      groupMeetingFrequency{
        value
        count
      }
  
    }
  }`;

  const response = await fetchFromServer("post", groupQuery);

  return response.data.data;
}

async function fetchUserEngagementStats() {
  const userQuery = `query{
    userStats{
      usersActive 
    }
  }`;

  const response = await fetchFromServer("post", userQuery);

  return response.data.data;
}

