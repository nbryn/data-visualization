import { GROUP_STATS } from "../ActionTypes";
import { fetchFromServer } from "../Fetch";

export const fetchGroupStats = () => async (dispatch) => {
  const data = `query{
    groupStats{
      groupTotal
      groupSize{
        value
        count
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
        year
        month
        count
        }
      }
    }
  }`;

  const response = await fetchFromServer("post", data);

  dispatch({
    type: GROUP_STATS,
    payload: response.data.data.groupStats,
  });
};

