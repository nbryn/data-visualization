import { fetchFromServer } from "../Fetch";
import { GROUP_DATA } from "../ActionTypes";

export const fetchGroupData = group => async dispatch => {
  const data = `query{
    groupData{
      group(group: ${group}){
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
    type: GROUP_DATA,
    payload: response.data.data.groupData
  });
};
