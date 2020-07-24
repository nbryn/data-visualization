import { convertNumberToMonth } from "../../util/Date";
import { fetchFromServer } from "./Fetch";
import { GROUP_STATS, GROUPS_TOTAL, GROUPS_LAST_YEAR } from "../reducers/GroupReducers";


export const fetchGroupStats = () => async (dispatch) => {
  const data = `query{
    groupStats{
      groupTotal
      groupSize{
        value
        count
      }
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

  const response = await fetchFromServer("groupStats", data);

  dispatch({
    type: GROUP_STATS,
    payload: response,
  });
};

export const fetchTotalGroups = () => async (dispatch) => {
  const data = `query{
    groupStats{
      groupTotal
    }
  }`;

  const response = await fetchFromServer("groupStats", data);

  dispatch({
    type: GROUPS_TOTAL,
    payload: response.groupTotal,
  });
};

export const fetchGroupsLastYear = () => async (dispatch) => {
  const data = `query{
    groupStats{
      groupsLastYear{
        year
        month
        count
        }
    }
  }`;

  const response = await fetchFromServer("groupStats", data);

  let total = 0;
  let month, year;
  const newState = response.groupsLastYear.map((element) => {
    total += element.count;
    year = element.year.toString().substring(2);
    month = convertNumberToMonth(element.month);

    return {
      name: month + " '" + year,
      value: total,
    };
  });

  dispatch({
    type: GROUPS_LAST_YEAR,
    payload: newState,
  });
};
