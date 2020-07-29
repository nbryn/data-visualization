import { fetchFromServer } from '../Fetch';

export const fetchNGOGroupData = async (ngo: string) => {
    const data = `query{
        ngoGroupData{
          groupData(ngo: ${ngo}){
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

    const response = await fetchFromServer('ngoGroupData', data, 'groupData');

    return response;
};
