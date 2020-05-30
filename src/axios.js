import { default as axiosLib } from 'axios';
import { getToken } from './utils/token';

const setupAxios = () => {
  console.log('axios');
  const instance = axiosLib.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });

  instance.interceptors.request.use((config) => {
    const customConfig = config;
    customConfig.headers = {
      'Content-Type': 'application/json',
    };

    if (config?.url !== 'auth/login') {
      customConfig.headers.Authorization = `Bearer ${getToken() || ''}`;
    }

    return customConfig;
  });

  return instance;
};

const axios = setupAxios();

export default axios;
