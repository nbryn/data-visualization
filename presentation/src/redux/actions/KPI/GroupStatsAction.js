import axios from "axios";

import { GROUP_STATS } from "../ActionTypes";

const url = "http://localhost:4000/graphql";

export const fetchGroupStats = () => async dispatch => {
  const data = `query{
    groupStats{
      groupTotal
      groupsLastMonth{
        resultMonth{
          count
          day{
            year
            month
            day
          }
        }
      }
      groupsLastYear{
        resultYear{
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
      type: GROUP_STATS,
      payload: response.data.data.groupStats
    });
  } catch (err) {
    console.log(err);
  }
};
