import { GROUP_STATS, GROUPS_TOTAL } from "../reducers/GroupReducers";
import { fetchFromServer } from "./Fetch";

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

