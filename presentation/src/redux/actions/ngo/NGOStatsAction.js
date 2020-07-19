import { GROUPS_PER_NGO } from "../ActionTypes.ts";
import { fetchFromServer } from "../Fetch.ts";

export const fetchNGOStats = () => async (dispatch) => {
    const data = `query {
        ngoStats {
          groupsNGO {
            name
            count
          }
          usersNGO {
            name
            count
          }
        }
      }`;
  
    const response = await fetchFromServer("ngoStats", data);
  
    dispatch({
      type: GROUPS_PER_NGO,
      payload: response,
    });
  };
  