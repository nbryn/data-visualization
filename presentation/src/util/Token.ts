import axios from 'axios';
import {UserDTO} from '../services/requests/DTOs';

export const setTokenInLocalStorage = (response: UserDTO): void => {
   const token = response.token;
   localStorage.setItem('Token', token);
};

export const setTokenInHeader = (): void => {
   const token = localStorage.getItem('Token');
   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeTokenFromLocalStorage = (): void => {
   localStorage.removeItem('Token');
};
