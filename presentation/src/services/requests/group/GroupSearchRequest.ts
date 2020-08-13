import { fetchFromServer } from '../Fetch';
import { GroupDto } from './GroupDto';

export const fetchDataForGroup = async (group: string): Promise<GroupDto> => {
    const data = `query{
      groupData{
        group(group: ${group}){
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

    const response: GroupDto = await fetchFromServer<GroupDto>('groupData', data, 'group');

    return response;
};
