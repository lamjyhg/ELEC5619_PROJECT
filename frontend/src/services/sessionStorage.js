export const setToken = (token) => sessionStorage.setItem('token', token);
export const setEmail = (email) => sessionStorage.setItem('email', email);
export const setType = (type) => sessionStorage.setItem('type', type);

export const getToken = () => {
  return sessionStorage.getItem('token');
};
export const removeToken = () => sessionStorage.removeItem('token');
export const clearSessionStorage = () => sessionStorage.clear();
