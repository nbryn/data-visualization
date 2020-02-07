import { NGO_GROUPS } from "../ActionTypes";
import { fetchFromServer } from "../Fetch";

export const fetchGroupsByNGO = ngo => async dispatch => {
  const data = `query{
        ngoGroupData{
          groupData(ngo: ${ngo}){
            name
            regDate   
            currency
            cycle
            lastMeeting           
            boxBalance
            meetingsTotal
            perShare
            serviceFee
            loanLimit   
            loans
            shares
            owner{
              firstName
              lastName
            }
            admin{
              firstName
              lastName
            }
            members                      
      }
      }
      }`;

  const response = await fetchFromServer("post", data);

  dispatch({
    type: NGO_GROUPS,
    payload: response.data.data.ngoGroupData
  });
};
