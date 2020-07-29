import { fetchFromServer } from '../Fetch';

export const fetchGroupSearchData = async (group: string) => {
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

    const response = await fetchFromServer('groupData', data, 'group');

    return response;

}
