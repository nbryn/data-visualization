import { GROUPS_PER_NGO } from "../ActionTypes";
import { fetchFromServer } from "../Fetch";

export const fetchGroupsPerNGO = () => async (dispatch) => {
    const data = `query {
        ngoStats {
          groupsNGO {
            ngo
            count
          }
        }
      }`;
  
    const response = await fetchFromServer("post", data);
  
    dispatch({
      type: GROUPS_PER_NGO,
      payload: response.data.data.ngoStats,
    });
  };
  