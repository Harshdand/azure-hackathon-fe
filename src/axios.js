import { default as axiosLib } from 'axios';
import { getToken } from './utils/token';

const setupAxios = () => {
  console.log('axios');
  const instance = axiosLib.create({
    baseURL: 'http://localhost:5000/api/',
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
