import { fetchFromServer } from '../Fetch';

export const fetchGroupsForNGO = async (ngo: string) => {
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

    const response = await fetchFromServer('ngoGroupData', data, 'groupData');

    return response;
};
