import axios from "axios";
import { KEY_STATS } from "../ActionTypes";

const url = "/graphql";

export const fetchKeyStats = () => async dispatch => {
  const data = `query{
    keyStats{
      userTotal
      groupTotal
      meetingTotal
      shareTotal
      userGender{
        value
        count
       }
       usersLastYear{
        data{
          month
          count
        }
      }  
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
    meetingsLastYear{
        data{
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
      type: KEY_STATS,
      payload: response.data.data.keyStats
    });
  } catch (err) {
    console.log(err);
  }
};
