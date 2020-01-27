import { NGO_GROUPS } from "../ActionTypes";
import { fetchFromServer } from "../Fetch";

export const fetchGroupsByNGO = ngo => async dispatch => {
  const data = `query{
        ngoGroupData{
          groupData(ngo: ${ngo}){
            name
            cycle
            meetings
            shares
            loans
            owner
            admin                      
      }
      }
      }`;

  const response = await fetchFromServer("post", data);

  dispatch({
    type: NGO_GROUPS,
    payload: response.data.data.ngoGroupData
  });
};
