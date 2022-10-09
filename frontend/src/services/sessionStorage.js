import Cookies from 'js-cookie';

// export const setToken = (token) => sessionStorage.setItem('token', token);
// export const setEmail = (email) => sessionStorage.setItem('email', email);
// export const setType = (type) => sessionStorage.setItem('type', type);

export const getToken = () => {
  return Cookies.get('JSESSIONID');
};

export const removeToken = () => Cookies.remove('JSESSIONID');
export const clearSessionStorage = () => {
  Object.keys(Cookies.get()).forEach(function (cookieName) {
    Cookies.remove(cookieName);
  });
};

export const setAdminAuthorityToken = (token) => {
  console.log(token);
  if (!token || token === undefined || token === 'undefined') {
    return null;
  }
  sessionStorage.setItem('adminAuthorityToken', token);
};

export const getAdminAuthorityToken = () => {
  return sessionStorage.getItem('adminAuthorityToken');
};

export const removeAdminAuthorityToken = () => {
  sessionStorage.removeItem('adminAuthorityToken');
};
