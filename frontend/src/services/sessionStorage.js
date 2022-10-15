import Cookies from 'js-cookie';

export const getToken = () => {
  if (
    Cookies.get('JSESSIONID') !== undefined ||
    Cookies.get('JSESSIONID') !== null
  ) {
    return Cookies.get('JSESSIONID');
  } else {
    return null;
  }
};

export const removeToken = () => {
  Cookies.remove('JSESSIONID', { path: '/', domain: 'localhost' });
};
export const clearSessionStorage = () => {
  Object.keys(Cookies.get()).forEach(function (cookieName) {
    Cookies.remove(cookieName);
  });
};

export const setAdminAuthorityToken = (token) => {
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
