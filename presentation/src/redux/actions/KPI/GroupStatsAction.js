import axios from "axios";

import { GROUP_STATS, GROUP_SIZE } from "../ActionTypes";

const url = "http://localhost:4000/graphql";

export const fetchGroupStats = () => async dispatch => {
  const data = `query{
    groupStats{
      groupTotal
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

export const fetchGroupSize = () => async dispatch => {
  const data = `query{
    groupStats{
      groupSize
     
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
      type: GROUP_SIZE,
      payload: response.data.data.groupStats.groupSize
    });
  } catch (err) {
    console.log(err);
  }
};
