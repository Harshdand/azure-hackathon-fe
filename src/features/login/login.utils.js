export const setLoginInfo = (resp) => {
  const { data = {}, headers = {} } = resp;
  localStorage.setItem('user', JSON.stringify(data));
  localStorage.setItem('token', headers.token);
};
