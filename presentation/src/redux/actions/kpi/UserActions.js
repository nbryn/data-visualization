import {
  USERS_LAST_MONTH,
  USERS_LAST_YEAR,
  USERS_STATS,
} from "../ActionTypes";
import { fetchFromServer } from "../Fetch";

export const fetchUserStats = () => async (dispatch) => {
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
      payload: response.data.data.userStats,
    });
  }
};

export const fetchUsersLastMonth = () => async (dispatch) => {
  const data = `query {
    userStats {
      usersLastMonth {
        data {
          count
          day {
            day
            month
            year
          }
        }
      }
    }
  }`;
  const response = await fetchFromServer("post", data);

  dispatch({
    type: USERS_LAST_MONTH,
    payload: response.data.data.userStats,
  });
};

export const fetchUsersLastYear = () => async (dispatch) => {
  const data = `query {
    userStats {
      usersLastYear {
        data {
          count
          year
          month
        }
      }
    }
  }`;

  const response = await fetchFromServer("post", data);

  console.log(response);

  dispatch({
    type: USERS_LAST_YEAR,
    payload: response.data.data.userStats,
  });
};
