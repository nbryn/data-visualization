import { fetchFromServer } from "../Fetch";
import { KEY_STATS } from "../ActionTypes";

export const fetchKeyStats = () => async dispatch => {
  let keyStats = {
    groupStats: "",
    userStats: "",
    shareStats: "",
    meetingStats: ""
  };

  const groupResponse = await fetchKeyGroupStats();
  keyStats.groupStats = groupResponse.groupStats;

  const userResponse = await fetchKeyUserStats();
  keyStats.userStats = userResponse.userStats;

  const meetingResponse = await fetchKeyMeetingStats();
  keyStats.meetingStats = meetingResponse.meetingStats;

  const shareResponse = await fetchKeyFinanceStats();

  keyStats.shareStats = shareResponse.financeStats.shareStats.shareTotal;

  console.log(keyStats);

  dispatch({
    type: KEY_STATS,
    payload: keyStats
  });
};

async function fetchKeyGroupStats() {
  const groupQuery = `query{
    groupStats{
      groupTotal    
     groupsLastMonth{
        data{
          count
          day{
            year
            month
            day
          }     
        }
    }
    groupsLastYear{
        data{
          year
          month
          count  
        }
      }      
    }
    }`;

  const response = await fetchFromServer("post", groupQuery);

  return response.data.data;
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
        data{
          year
          month
          count
        }
      }       
    }
    }`;

  const response = await fetchFromServer("post", userQuery);

  return response.data.data;
}

async function fetchKeyMeetingStats() {
  const meetingQuery = `query {
    meetingStats{
      meetingTotal
      meetingsLastYear{
        data{
          year
          month
          count
        }
      }            
    }
  }`;
  const response = await fetchFromServer("post", meetingQuery);

  return response.data.data;
}

async function fetchKeyFinanceStats() {
  const shareQuery = `query {
    financeStats{
      shareStats {
        shareTotal
      }
    }
  }`;
  const response = await fetchFromServer("post", shareQuery);

  return response.data.data;
}
