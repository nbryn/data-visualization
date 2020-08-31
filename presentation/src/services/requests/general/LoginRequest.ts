import {fetchFromServer} from '../Fetch';
import {UserDto} from '../Dto';

export const fetchLogin = async (username: string, password: string): Promise<UserDto> => {
   const data = `mutation {
      signin(input: {
        username: "${username}"
        password: "${password}"
      })   {
        ... on User {
          token
          firstName
          lastName
          phoneNumber
          email
          gender
        }
    
        ... on Error {
          errorMessage
        }
      }
    }`;

   const response: UserDto = await fetchFromServer<UserDto>('signin', data);

   return response;
};
