import {fetchFromServer} from '../Fetch';
import {UserDTO} from '../DTOs';

export const fetchLogin = async (username: string, password: string): Promise<UserDTO> => {
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

   const response: UserDTO = await fetchFromServer<UserDTO>('signin', data);

   return response;
};
