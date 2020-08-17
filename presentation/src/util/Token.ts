import axios from 'axios';
import { UserDto } from '../services/requests/Dto';

export const setTokenInLocalStorage = (response: UserDto): void => {
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
