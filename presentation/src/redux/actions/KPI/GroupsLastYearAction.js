import axios from "axios";

import { GROUPS_LAST_YEAR } from "../ActionTypes";

const url = "http://localhost:4000/graphql";

export const fetchGroupsLastYear = () => async dispatch => {
  const data = `query{
    groupsLastYear{
      signups{
        month
        count
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
        type: GROUPS_LAST_YEAR,
        payload: response.data.data.groupsLastYear
      });
  } catch (err) {
    console.log(err);
  }
};
