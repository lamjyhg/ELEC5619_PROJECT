import Cookies from "js-cookie";

export const getToken = () => {
  return Cookies.get("JSESSIONID");
};

export const removeToken = () => Cookies.remove("JSESSIONID");
export const clearSessionStorage = () => {
  Object.keys(Cookies.get()).forEach(function (cookieName) {
    Cookies.remove(cookieName);
  });
};

export const setAdminAuthorityToken = (token) => {
  
  if (!token || token === undefined || token === "undefined") {
    return null;
  }
  sessionStorage.setItem("adminAuthorityToken", token);
};

export const getAdminAuthorityToken = () => {
  return sessionStorage.getItem("adminAuthorityToken");
};

export const removeAdminAuthorityToken = () => {
  sessionStorage.removeItem("adminAuthorityToken");
};
