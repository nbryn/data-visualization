import { USERS_LAST_MONTH, USERS_LAST_YEAR, USERS_STATS } from "../ActionTypes";
import { fetchFromServer } from "../Fetch";
import { convertNumberToMonth } from "../../../util/Date";

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

  const usersLastMonth = {
    labels: [],
    chartData: [],
    counter: 0,
  };

  usersLastMonth.labels = response.data.data.userStats.usersLastMonth.data.map(
    (element) => element.day.day + "/" + element.day.month
  );
  usersLastMonth.chartData = response.data.data.userStats.usersLastMonth.data.map(
    (element) => (usersLastMonth.counter += element.count)
  );


  dispatch({
    type: USERS_LAST_MONTH,
    payload: usersLastMonth,
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

  const usersLastYear = {
    labels: [],
    chartData: [],
    counter: 0,
  };

  usersLastYear.labels = response.data.data.userStats.usersLastYear.data.map(
    (element) => {
      return (
        convertNumberToMonth(element.month) +
        element.year.toString().substring(2)
      );
    }
  );

  usersLastYear.chartData = response.data.data.userStats.usersLastYear.data.map(
    (element) => (usersLastYear.counter += element.count)
  );

  dispatch({
    type: USERS_LAST_YEAR,
    payload: usersLastYear,
  });
};
