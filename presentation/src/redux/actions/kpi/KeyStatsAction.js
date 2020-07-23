import { fetchFromServer } from "../Fetch.ts";
import { KEY_STATS } from "../../reducers/KPIReducer";

export const fetchKeyStats = () => async (dispatch) => {
  let keyStats = {
    groupStats: "",
    userStats: "",
    shareStats: "",
    meetingStats: "",
  };

  const groupResponse = await fetchKeyGroupStats();
  keyStats.groupStats = groupResponse;

  const userResponse = await fetchKeyUserStats();
  keyStats.userStats = userResponse;

  const meetingResponse = await fetchKeyMeetingStats();
  keyStats.meetingStats = meetingResponse;

  const shareResponse = await fetchKeyFinanceStats();

  keyStats.shareStats = shareResponse.shareStats.shareTotal;

  dispatch({
    type: KEY_STATS,
    payload: keyStats,
  });
};

export async function fetchKeyGroupStats() {
  const groupQuery = `query{
    groupStats{
      groupTotal    
     groupsLastMonth{
          count
          day{
            year
            month
            day
          }     
    }
    groupsLastYear{
          year
          month
          count  
        }     
    }
    }`;

  const response = await fetchFromServer("groupStats", groupQuery);

  return response;
}

async function fetchKeyUserStats() {
  const userQuery = `query{
    userStats{
      userCount   
      userGenderStats{
        value
        count
       }
      usersLastYear{
          year
          month
          count
        }     
    }
    }`;

  const response = await fetchFromServer("userStats", userQuery);

  return response;
}

async function fetchKeyMeetingStats() {
  const meetingQuery = `query {
    meetingStats{
      meetingTotal
      meetingsLastYear{
          year
          month
          count
        }          
    }
  }`;
  const response = await fetchFromServer("meetingStats", meetingQuery);

  return response;
}

async function fetchKeyFinanceStats() {
  const shareQuery = `query {
    financeStats{
      shareStats {
        shareTotal
      }
    }
  }`;
  const response = await fetchFromServer("financeStats", shareQuery);

  return response;
}
