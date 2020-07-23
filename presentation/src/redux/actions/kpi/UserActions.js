import {
  USERS_LAST_MONTH,
  USERS_LAST_YEAR,
  USERS_STATS,
} from "../ActionTypes.ts";
import { fetchFromServer } from "../Fetch.ts";
import { convertNumberToMonth } from "../../../util/Date";

export const fetchUserStats = () => async (dispatch) => {
  const data = `query {
    userStats{
      userCount
      usersLastMonth{
          day{
            day
            month
            year
          }
          count
      }
      usersLastYear{
          year
          month
          count
        }
      userGenderStats{
        value
        count
      }
    }
  }`;

  const response = await fetchFromServer("userStats", data);

  dispatch({
    type: USERS_STATS,
    payload: response,
  });
};

export const fetchUsersLastMonth = () => async (dispatch) => {
  const data = `query {
    userStats {
      usersLastMonth {
          count
          day {
            day
            month
            year
        }
      }
    }
  }`;
  const response = await fetchFromServer("userStats", data);

  const usersLastMonth = {
    labels: [],
    data: [],
    counter: 0,
    usersLastWeek: {
      labels: [],
      data: [],
      counter: 0,
    },
  };

  let counter = 0;
  let usersLastWeek = 0;

  usersLastMonth.labels = response.usersLastMonth.map(
    (element) => element.day.day + "/" + element.day.month
  );
  usersLastMonth.data = response.usersLastMonth.map((element) => {
    counter++;
    if (counter >= response.usersLastMonth.length - 7) {
      usersLastWeek += element.count;
    }
    return (usersLastMonth.counter += element.count);
  });

  usersLastMonth.usersLastWeek.labels = usersLastMonth.labels.slice(
    usersLastMonth.labels.length - 7
  );
  usersLastMonth.usersLastWeek.data = usersLastMonth.data.slice(
    usersLastMonth.data.length - 7
  );
  usersLastMonth.usersLastWeek.counter = usersLastWeek;

  dispatch({
    type: USERS_LAST_MONTH,
    payload: usersLastMonth,
  });
};

export const fetchUsersLastYear = () => async (dispatch) => {
  const data = `query {
    userStats {
      usersLastYear {
          count
          year
          month
      }
    }
  }`;

  const response = await fetchFromServer("userStats", data);

  const usersLastYear = {
    labels: [],
    data: [],
    counter: 0,
  };

  usersLastYear.labels = response.usersLastYear.map((element) => {
    return (
      convertNumberToMonth(element.month) + "'" + element.year.toString().substring(2)
    );
  });

  usersLastYear.data = response.usersLastYear.map(
    (element) => (usersLastYear.counter += element.count)
  );

  dispatch({
    type: USERS_LAST_YEAR,
    payload: usersLastYear,
  });
};
