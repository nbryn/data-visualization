import {fetchFromServer} from '../Fetch';
import {GroupDto} from './GroupDto';

export const fetchDataForGroup = async (group: string): Promise<GroupDto> => {
    const data = `query {
    groupSearch(input: { group: ${group} }) {
      ... on Group {
        regDate
        currency
        lastMeeting
        boxBalance
        meetingsTotal
        perShare
        loans
        shares
        owner {
          firstName
          lastName
        }
        admin {
          firstName
          lastName
        }
        members
      }
  
      ... on Error {
        errorMessage
      }
    }
  }`;

    const response: GroupDto = await fetchFromServer<GroupDto>('groupSearch', data);

    return response;
};
