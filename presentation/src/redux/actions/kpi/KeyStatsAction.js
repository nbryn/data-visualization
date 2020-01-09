import axios from "axios";
import { KEY_STATS } from "../ActionTypes";

const url = "/graphql";

export const fetchKeyStats = () => async dispatch => {
  let groupResponse, userResponse, meetingResponse, shareResponse;

  try {
    let keyStats = {
      groupStats: "",
      userStats: "",
      shareStats: "",
      meetingStats: ""
    };

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
          month
          count  
        }
      }
      
    }
    }`;

    groupResponse = await axios({
      url,
      method: "post",
      data: {
        query: groupQuery
      }
    });

    keyStats.groupStats = groupResponse.data.data.groupStats;

    const userQuery = `query{
      userStats{
        userCount   
        userGenderStats{
          value
          count
         }
        usersLastYear{
          data{
            month
            count
          }
        }       
      }
      }`;

    userResponse = await axios({
      url,
      method: "post",
      data: {
        query: userQuery
      }
    });

    keyStats.userStats = userResponse.data.data.userStats;

    const meetingQuery = `query {
      meetingStats{
        meetingTotal
        meetingsLastYear{
          data{
            month
            count
          }
        }            
      }
    }`;

    meetingResponse = await axios({
      url,
      method: "post",
      data: {
        query: meetingQuery
      }
    });

    keyStats.meetingStats = meetingResponse.data.data.meetingStats;

    const shareQuery = `query {
      financeStats{
        shareStats {
          shareTotal
        }

      }
    }`;

    shareResponse = await axios({
      url,
      method: "post",
      data: {
        query: shareQuery
      }
    });

    keyStats.shareStats = shareResponse.data.data.financeStats.shareStats.shareTotal;

    dispatch({
      type: KEY_STATS,
      payload: keyStats
    });
  } catch (err) {
    console.log(err);
  }
};
