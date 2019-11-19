import { removeTokenOnLogout } from "../../../security/Token";

export const signOut = () => {
  removeTokenOnLogout();

  window.location.href = "/";
};
