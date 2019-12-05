import axios from "axios";

import { GROUPS_LAST_MONTH } from "../ActionTypes";

const url = "http://localhost:4000/graphql";

export const fetchGroupsLastMonth = () => async dispatch => {
  const data = `query{
    groupsLastMonth{
       signups{
         count
         day{
           day
           month
           year
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
      type: GROUPS_LAST_MONTH,
      payload: response.data.data.groupsLastMonth
    });
  } catch (err) {
    console.log(err);
  }
};
