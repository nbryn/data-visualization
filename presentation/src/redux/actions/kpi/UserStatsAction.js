import { USERS_STATS } from "../ActionTypes";
import { fetchFromServer } from "../Fetch";

export const fetchUserStats = () => async dispatch => {
  const data = `query {
    userStats{
      userCount
      usersLastMonth{
        data{
          day{
            day
            month
            year
          }
          count
        }
      }
      usersLastYear{
        data{
          year
          month
          count
        }
      }
      userGenderStats{
        value
        count
      }
    }
  }`;

  const response = await fetchFromServer("post", data);

  if (response.data.errors) {
    return response.data.errors[0].extensions.code;
  } else {
    dispatch({
      type: USERS_STATS,
      payload: response.data.data.userStats
    });
  }

  return response.data.data.userStats;
};
