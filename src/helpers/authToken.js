

export const setToken = token => {
  localStorage.setItem('token', token);
  return token;
};
export const removeToken = () => {
  localStorage.removeItem('token');
};
export const getToken = () => {
  return localStorage.getItem('token');
};