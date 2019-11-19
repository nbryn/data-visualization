import axios from "axios";

export const setTokenOnLogin = response => {
  const token = response.data.data.signin.token;
  localStorage.setItem("Token", token);
};

export const setTokenOnApiRequest = () => {
  const token = localStorage.getItem("Token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const removeTokenOnLogout = () => {
localStorage.removeItem("Token");
}
