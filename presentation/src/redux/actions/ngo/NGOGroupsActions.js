import { ALL_NGO_GROUPS } from "../ActionTypes";
import { fetchFromServer } from "../Fetch";

export const fetchGroupsByNGO = ngo => async dispatch => {
  const data = `query{
        ngoGroupData{
          groupData(ngo: ${ngo}){
            id
            regDate
            name
            currency
            lastMeeting
            cycle
            boxBalance
            meetingsTotal
            perShare
            serviceFee
            loanLimit
            shares
            loans
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
    type: ALL_NGO_GROUPS,
    payload: response.data.data.ngoGroupData
  });
};
