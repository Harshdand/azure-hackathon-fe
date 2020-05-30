import axios from '../../axios';

export const login = (data) => {
  return axios({
    method: 'POST',
    url: 'auth/login',
    data,
  });
};
