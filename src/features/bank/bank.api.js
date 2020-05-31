import axios from '../../axios';

export const login = (data) => {
  return axios({
    method: 'POST',
    url: '/login',
    data,
  });
};

// export const getUserPolicies = () => {
//   return axios({
//     method: 'get',
//     url: `/getPolicies`,
//   });
// };

export const createUser = (data) => {
  return axios({
    method: 'POST',
    url: `/person`,
    data,
  });
};

export const addAsset = (data) => {
  return axios({
    method: 'POST',
    url: `/asset`,
    data,
  });
};
