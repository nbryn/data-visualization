import { fetchFromServer } from '../Fetch';

export const fetchDataForGroup = async (group: string) => {
    const data = `query{
      groupData{
        group(group: ${group}){
          name
          regDate   
          currency    
          lastMeeting           
          boxBalance
          meetingsTotal
          perShare
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
};
