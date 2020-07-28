import { fetchFromServer } from "../../../services/requests/Fetch.ts";
import { GROUP_DATA } from "../../reducers/NGOReducer";

export const fetchGroupData = group => async dispatch => {
  const data = `query{
    groupData{
      group(group: ${group}){
        name
        regDate   
        currency
        cycle
        type
        ngo
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

  console.log(response);

  dispatch({
    type: GROUP_DATA,
    payload: response.data.data.groupData
  });
};
