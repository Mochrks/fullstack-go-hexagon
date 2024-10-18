import axios from 'axios';

// config intercerptor
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', 
  timeout: 5000, 
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Request Interceptor', config);
    // console.log('Request Interceptor run ');
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response Interceptor');
    return response;
  },
  (error) => {
    if (error.response) {
      console.log('Error Interceptor', error.response);
    } else if (error.request) {
      console.log('Error Request', error.request);
    } else {
      console.log('Error Message', error.message);
    }
    return Promise.reject(error);
  }
);





