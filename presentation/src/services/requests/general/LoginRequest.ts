import { fetchFromServer } from '../Fetch';

export const fetchLogin = async (
    username: string,
    password: string
): Promise<any> => {
    const data = `mutation signin {
    signin(input: {
      username: "${username}"
      password: "${password}"
    })  
    }`;

    const response = await fetchFromServer('signin', data);

    return response;
};
