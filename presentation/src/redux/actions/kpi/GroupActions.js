import { GROUP_STATS } from "../ActionTypes.ts";
import { fetchFromServer } from "../Fetch.ts";

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

