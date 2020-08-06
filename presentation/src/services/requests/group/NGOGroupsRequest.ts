import { fetchFromServer } from '../Fetch';
import {GroupDto} from './GroupDto';

export const fetchGroupsForNGO = async (ngo: string): Promise<GroupDto[]> => {
    const data = `query{
        ngoGroupData{
          groupData(ngo: ${ngo}){
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

    const response: GroupDto[] = await fetchFromServer<GroupDto[]>('ngoGroupData', data, 'groupData');

    return response;
};
