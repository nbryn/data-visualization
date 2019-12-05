import axios from "axios";

import { USERS_LAST_YEAR } from "../ActionTypes";

const url = "http://localhost:4000/graphql";

export const fetchUsersLastYear = () => async dispatch => {
  const data = `query{
        usersLastYear{
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
      type: USERS_LAST_YEAR,
      payload: response.data.data.usersLastYear
    });
  } catch (err) {
    console.log(err);
  }
};
