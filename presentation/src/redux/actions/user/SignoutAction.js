import { removeTokenFromLocalStorage } from "../../../security/Token";

export const signOut = () => {
  removeTokenFromLocalStorage();

  window.location.href = "/";
};
