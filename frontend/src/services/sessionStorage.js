import Cookies from "js-cookie";

export const setToken = (token) => sessionStorage.setItem('token', token);
export const setEmail = (email) => sessionStorage.setItem('email', email);
export const setType = (type) => sessionStorage.setItem('type', type);

export const getToken = () => {
  console.log(Cookies)
  return Cookies.get('JSESSIONID');
};
export const removeToken = () => sessionStorage.removeItem('token');
export const clearSessionStorage = () => sessionStorage.clear();
