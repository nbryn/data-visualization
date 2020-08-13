import axios from 'axios';

export const setTokenInLocalStorage = (response: any) => {
    const token = response.token;
    localStorage.setItem('Token', token);
};

export const setTokenInHeader = () => {
    const token = localStorage.getItem('Token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeTokenFromLocalStorage = () => {
    localStorage.removeItem('Token');
};
