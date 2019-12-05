import axios from "axios";

import { GROUP_TOTAL } from "../ActionTypes";

const url = "http://localhost:4000/graphql";

export const fetchGroupTotal = () => async dispatch => {
  const data = `query{
        groupTotal
 
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
        type: GROUP_TOTAL,
        payload: response.data.data.groupTotal
      });

  } catch (err) {
    console.log(err);
  }
};
